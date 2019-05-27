import { PublicClientApplication } from "../../appconfig/publicClientApplication";
import { AuthenticationResult } from "../../contracts/authenticationResult";
import { IServiceBundle } from "../../core/IServiceBundle";
import { AcquireTokenCommonParameters } from "../parameters/acquireTokenCommonParameters";
import { AcquireTokenWithDeviceCodeParameters } from "../parameters/AcquiretokenWithDeviceCodeParameters";
import { AbstractExecutor } from "./AbstractExecutor";
import { IPublicClientApplicationExecutor } from "./IPublicClientApplicationExecutor";
import { AuthenticationRequestParameters } from "../../requests/AuthenticationRequestParameters";

export class PublicClientExecutor extends AbstractExecutor implements IPublicClientApplicationExecutor {

    private publicClientApplication: PublicClientApplication;

    constructor(serviceBundle: IServiceBundle, publicClientApplication: PublicClientApplication) {
        super(serviceBundle);
        this.publicClientApplication = publicClientApplication;
    }

    public ExecuteDeviceCodeAsync(
        commonParameters: AcquireTokenCommonParameters,
        deviceCodeParameters: AcquireTokenWithDeviceCodeParameters): Promise<AuthenticationResult> {

        const requestContext = this.CreateRequestContextAndLogVersionInfo(commonParameters.TelemetryCorrelationId);

        const requestParams = new AuthenticationRequestParameters(
            this.serviceBundle,
            this.publicClientApplication.UserTokenCacheInternal,
            commonParameters,
            requestContext);

        const handler = new DeviceCodeRequest(this.serviceBundle, requestParams, deviceCodeParameters);

        return handler.RunAsync();

    }
}
