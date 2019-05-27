import { AuthenticationResult } from "../contracts/AuthenticationResult";
import { IServiceBundle } from "../core/IServiceBundle";
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
        client.AddBodyParameter(OAuth2Parameter.ClientId, AuthenticationRequestParameters.ClientId);
        client.AddBodyParameter(OAuth2Parameter.ClientInfo, "1");

        client.AddBodyParameter(OAuth2Parameter.Scope,
        this.GetDecoratedScope(AuthenticationRequestParameters.Scope).AsSingleString());

        client.AddQueryParameter(OAuth2Parameter.Claims, AuthenticationRequestParameters.Claims);

        foreach (var kvp in additionalBodyParameters)
        {
            client.AddBodyParameter(kvp.Key, kvp.Value);
        }

        return await this.SendHttpMessageAsync(client, tokenEndpoint).ConfigureAwait(false);
    }

    private async SendHttpMessageAsync(
        client: OAuth2Client, tokenEndpoint: string): Promise<MsalTokenResponse> {
        const builder = new UriBuilder(tokenEndpoint);
        builder.AppendQueryParameters(this.authenticationRequestParameters.ExtraQueryParameters);
        const msalTokenResponse =
            await client
                .GetTokenAsync(builder.Uri,
                    this.authenticationRequestParameters.RequestContext)
                .ConfigureAwait(false);

        if (string.IsNullOrEmpty(msalTokenResponse.Scope))
        {
            msalTokenResponse.Scope = this.authenticationRequestParameters.Scope.AsSingleString();
            // this.authenticationRequestParameters.RequestContext.Logger.Info("ScopeSet was missing from the token response, so using developer provided scopes in the result");
        }

        return msalTokenResponse;
    }
}
