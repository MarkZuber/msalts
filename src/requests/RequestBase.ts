import { AuthenticationResult } from "../contracts/authenticationResult";
import { IServiceBundle } from "../core/IServiceBundle";
import { MsalTokenResponse } from "../http/MsalTokenResponse";
import { OAuth2Client } from "../http/OAuth2Client";
import { OAuth2Parameter } from "../http/OAuth2Parameter";
import { OAuth2Value } from "../http/OAuth2Value";
import { AuthenticationRequestParameters } from "./AuthenticationRequestParameters";

export abstract class RequestBase {
    protected serviceBundle: IServiceBundle;
    protected authenticationRequestParameters: AuthenticationRequestParameters;

    constructor(
        serviceBundle: IServiceBundle,
        authenticationRequestParameters: AuthenticationRequestParameters) {
        this.serviceBundle = serviceBundle;
        this.authenticationRequestParameters = authenticationRequestParameters;

        // this.ValidateScopeInput(this.authenticationRequestPararameters.Scope);
        // acquireTokenParameters.LogParameters()
    }

    public async RunAsync(): Promise<AuthenticationResult> {
        // todo: get api event

        // try
        // {
            await this.PreRunAsync();
            // todo: log parameters and request started
            const authenticationResult = await this.ExecuteAsync();
            // todo: log returned token, update api event
            return authenticationResult;

        // } catch {

        // } finally {

        // }
    }

    protected abstract async PreRunAsync(): Promise<void>;
    protected abstract async ExecuteAsync(): Promise<AuthenticationResult>;

    protected async SendTokenRequestAsync(
        tokenEndpoint: string,
        additionalBodyParameters: Map<string, string>) {
        const client = new OAuth2Client(this.serviceBundle);
        client.AddBodyParameter(OAuth2Parameter.ClientId, this.authenticationRequestParameters.ClientId);
        client.AddBodyParameter(OAuth2Parameter.ClientInfo, "1");

        client.AddBodyParameter(
            OAuth2Parameter.Scope,
            this.scopeSetToString(this.GetDecoratedScope(this.authenticationRequestParameters.Scope)));

        client.AddQueryParameter(OAuth2Parameter.Claims, this.authenticationRequestParameters.Claims);
        additionalBodyParameters.forEach((value, key) => client.AddBodyParameter(key, value));

        return await this.SendHttpMessageAsync(client, tokenEndpoint);
    }

    protected GetDecoratedScope(inputScope: Set<string>): Set<string> {
        const set = new Set<string>(inputScope);
        OAuth2Value.ReservedScopes.forEach((value) => set.add(value));
        return set;
    }

    protected async ResolveAuthorityEndpointsAsync(): Promise<void> {
        await this
            .authenticationRequestParameters
            .Authority
            .UpdateCanonicalAuthorityAsync(this.authenticationRequestParameters.RequestContext);

        this.authenticationRequestParameters.Endpoints =
            await this.serviceBundle.AuthorityEndpointResolutionManager.ResolveEndpointsAsync(
                this.authenticationRequestParameters.AuthorityInfo,
                this.authenticationRequestParameters.LoginHint,
                this.authenticationRequestParameters.RequestContext);
    }

    private scopeSetToString(input: Set<string>): string {
        return Array.from(input.values()).join(' ');
    }

    private async SendHttpMessageAsync(
        client: OAuth2Client, tokenEndpoint: string): Promise<MsalTokenResponse> {
        const params = new URLSearchParams();
        this.authenticationRequestParameters.ExtraQueryParameters.forEach((value, key) => params.append(key, value));
        const url = new URL(tokenEndpoint + '?' + params.toString());

        const msalTokenResponse =
            await client.GetTokenAsync(url, this.authenticationRequestParameters.RequestContext);

        if (!msalTokenResponse.Scope) {
            msalTokenResponse.Scope = this.scopeSetToString(this.authenticationRequestParameters.Scope);
        }

        return msalTokenResponse;
    }
}
