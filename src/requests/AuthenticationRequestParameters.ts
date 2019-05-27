import { AcquireTokenCommonParameters } from "../apiconfig/parameters/acquireTokenCommonParameters";
import { IServiceBundle } from "../core/IServiceBundle";
import { RequestContext } from "../core/RequestContext";
import { ITokenCacheInternal } from "../tokencache/ITokenCacheInternal";

export class AuthenticationRequestParameters {
    private commonParameters: AcquireTokenCommonParameters;
    private loginHint: string;
    private serviceBundle: IServiceBundle;

    constructor(
        serviceBundle: IServiceBundle,
        tokenCache: ITokenCacheInternal,
        commonParameters: AcquireTokenCommonParameters,
        requestContext: RequestContext) {
        this.serviceBundle = serviceBundle;
        this.commonParameters = commonParameters;
        this.loginHint = "";
    }

    public get ClientId(): string {
        return this.serviceBundle.Config.ClientId;
    }
}
