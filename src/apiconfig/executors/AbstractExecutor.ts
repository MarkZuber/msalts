import { IServiceBundle } from "../../core/IServiceBundle";

export abstract class AbstractExecutor {
    protected serviceBundle: IServiceBundle;

    constructor(serviceBundle: IServiceBundle) {
        this.serviceBundle = serviceBundle;
    }

    protected CreateRequestContextAndLogVersionInfo(telemetryCorrelationId: string): RequestContext {
        const requestContext = new RequestContext(this.serviceBundle, telemetryCorrelationId);

        // requestContext.Logger.Info(
        //     string.Format(
        //         CultureInfo.InvariantCulture,
        //         "MSAL {0} with assembly version '{1}', file version '{2}' and informational version '{3}'. TelemetryCorrelationId({4})",
        //         ServiceBundle.PlatformProxy.GetProductName(),
        //         MsalIdHelper.GetMsalVersion(),
        //         AssemblyUtils.GetAssemblyFileVersionAttribute(),
        //         AssemblyUtils.GetAssemblyInformationalVersion(),
        //         requestContext.TelemetryCorrelationId));

        return requestContext;
    }

}
