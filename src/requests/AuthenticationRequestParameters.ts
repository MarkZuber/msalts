import { AcquireTokenCommonParameters } from "../apiconfig/parameters/acquireTokenCommonParameters";
import { IServiceBundle } from "../core/IServiceBundle";
import { RequestContext } from "../core/RequestContext";
import { Authority } from "../instance/Authority";
import { AuthorityEndpoints } from "../instance/AuthorityEndpoints";
import { ITokenCacheInternal } from "../tokencache/ITokenCacheInternal";

export class AuthenticationRequestParameters {
    private commonParameters: AcquireTokenCommonParameters;
    private loginHint: string;
    private serviceBundle: IServiceBundle;
    private extraQueryParameters: Map<string, string>;
    private requestContext: RequestContext;
    private authorityEndpoints: AuthorityEndpoints;
    private authority: Authority;

    constructor(
        serviceBundle: IServiceBundle,
        tokenCache: ITokenCacheInternal,
        commonParameters: AcquireTokenCommonParameters,
        requestContext: RequestContext) {

        this.authority = commonParameters.AuthorityOverride ?
            Authority.CreateAuthorityWithOverride(serviceBundle, commonParameters.AuthorityOverride) :
            Authority.CreateAuthorityFromServiceBundle(serviceBundle);

        this.serviceBundle = serviceBundle;
        this.commonParameters = commonParameters;
        this.loginHint = "";
        this.extraQueryParameters = new Map<string, string>();
        this.requestContext = requestContext;
        this.serviceBundle.Config
            .ExtraQueryParameters.forEach((value, key) => this.extraQueryParameters.set(key, value));

        this.commonParameters
            .ExtraQueryParameters.forEach((value, key) => this.extraQueryParameters.set(key, value));

        this.authorityEndpoints = new AuthorityEndpoints('', '', '');
    }

    public get ClientId(): string {
        return this.serviceBundle.Config.ClientId;
    }

    public get Claims(): string {
        return this.commonParameters.Claims;
    }

    public get Scope(): Set<string> {
        return this.commonParameters.Scopes;
    }

    public get ExtraQueryParameters(): Map<string, string> {
        return this.extraQueryParameters;
    }

    public get RequestContext(): RequestContext {
        return this.requestContext;
    }

    public get Endpoints(): AuthorityEndpoints {
        return this.authorityEndpoints;
    }

    public set Endpoints(endpoints: AuthorityEndpoints) {
        this.authorityEndpoints = endpoints;
    }

    public get Authority(): Authority {
        return this.authority;
    }
}
