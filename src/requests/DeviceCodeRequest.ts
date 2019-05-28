import { AcquireTokenWithDeviceCodeParameters } from "../apiconfig/parameters/AcquiretokenWithDeviceCodeParameters";
import { AuthorityType } from "../appconfig/authorityType";
import { AuthenticationResult } from "../contracts/authenticationResult";
import { DeviceCodeResult } from "../contracts/DeviceCodeResult";
import { IServiceBundle } from "../core/IServiceBundle";
import { DeviceCodeResponse } from "../http/DeviceCodeResponse";
import { HttpMethod } from "../http/HttpMethod";
import { MsalTokenResponse } from "../http/MsalTokenResponse";
import { OAuth2Client } from "../http/OAuth2Client";
import { OAuth2GrantType } from "../http/OAuth2GrantType";
import { OAuth2Parameter } from "../http/OAuth2Parameter";
import { AuthenticationRequestParameters } from "./AuthenticationRequestParameters";
import { RequestBase } from "./RequestBase";

export class DeviceCodeRequest extends RequestBase {

    private deviceCodeParameters: AcquireTokenWithDeviceCodeParameters;

    constructor(
        serviceBundle: IServiceBundle,
        authenticationRequestPararameters: AuthenticationRequestParameters,
        deviceCodeParameters: AcquireTokenWithDeviceCodeParameters) {
            super(serviceBundle, authenticationRequestPararameters);
            this.deviceCodeParameters = deviceCodeParameters;
        }

    protected PreRunAsync(): Promise<void> {
// tslint:disable-next-line: no-empty
        return new Promise<void>(() => { });
     }

    protected async ExecuteAsync(): Promise<AuthenticationResult> {
        // if (this.serviceBundle.Config.AuthorityInfo.AuthorityType === AuthorityType.Adfs) {
        //     throw new Error("Adfs does not support device code flow");
        // }

        await this.ResolveAuthorityEndpointsAsync();

        const client = new OAuth2Client(this.serviceBundle);

        const deviceCodeScopes = new Set<string>();
        // union with authenticationrequestparameters scopes
        // add offline access
        // add profile
        // add openid

        client.AddBodyParameter(OAuth2Parameter.ClientId, this.authenticationRequestParameters.ClientId);
        client.AddBodyParameter(OAuth2Parameter.Scope, this.scopeSetToString(deviceCodeScopes));
        client.AddBodyParameter(OAuth2Parameter.Claims, this.authenticationRequestParameters.Claims);

        const deviceCodeEndpoint: string = this.authenticationRequestParameters
            .Endpoints
            .TokenEndpoint
            .Replace("token", "devicecode")
            .Replace("common", "organizations");

        const params = new URLSearchParams();
        this.authenticationRequestParameters.ExtraQueryParameters.forEach((value, key) => params.append(key, value));
    
        const url = new URL(deviceCodeEndpoint + '?' + params.toString());

        const response = await client.ExecuteRequestAsync<DeviceCodeResponse>(
            DeviceCodeResponse,
            url,
            HttpMethod.Post,
            this.authenticationRequestParameters.RequestContext);

        const deviceCodeResult = response.GetResult(this.authenticationRequestParameters.ClientId, deviceCodeScopes);
        await this.deviceCodeParameters.DeviceCodeResultCallback(deviceCodeResult);

        const msalTokenResponse = await this.WaitForTokenResponseAsync(deviceCodeResult);
        return await this.CacheTokenResponseAndCreateAuthenticationResultAsync(msalTokenResponse);
    }

    private async WaitForTokenResponseAsync(deviceCodeResult: DeviceCodeResult): Promise<MsalTokenResponse> {

        return await this.SendTokenRequestAsync(
            this.authenticationRequestParameters.Endpoints.TokenEndpoint.Replace("common", "organizations"),
            this.GetBodyParameters(deviceCodeResult));
    }

    // todo: make this method common to use across classes...
    private scopeSetToString(input: Set<string>): string {
        return Array.from(input.values()).join(' ');
    }

    private GetBodyParameters(deviceCodeResult: DeviceCodeResult): Map<string, string> {
        const dict = new Map<string, string>();
        dict.set(OAuth2Parameter.GrantType, OAuth2GrantType.DeviceCode);
        dict.set(OAuth2Parameter.DeviceCode, deviceCodeResult.DeviceCode);

        return dict;
    }
}
