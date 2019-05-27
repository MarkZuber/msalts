import { IServiceBundle } from "./IServiceBundle";

export class RequestContext {
    private serviceBundle: IServiceBundle;
    private telemetryCorrelationId: string;

    constructor(serviceBundle: IServiceBundle, telemetryCorrelationId: string) {
        this.serviceBundle = serviceBundle;
        this.telemetryCorrelationId = telemetryCorrelationId;
        // todo: corelogger...
    }
}
