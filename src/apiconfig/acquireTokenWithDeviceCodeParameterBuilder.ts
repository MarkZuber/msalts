import { AuthenticationResult} from "../contracts/authenticationResult";
import { DeviceCodeResult } from "../contracts/DeviceCodeResult";
import { AbstractPublicClientAcquireTokenParameterBuilder } from "./abstractPublicClientAcquireTokenParameterBuilder";
import { IPublicClientApplicationExecutor } from "./executors/IPublicClientApplicationExecutor";
import { AcquireTokenWithDeviceCodeParameters } from "./parameters/AcquiretokenWithDeviceCodeParameters";

export class AcquireTokenWithDeviceCodeParameterBuilder
    extends AbstractPublicClientAcquireTokenParameterBuilder<AcquireTokenWithDeviceCodeParameterBuilder> {

    public static Create(
        executor: IPublicClientApplicationExecutor,
        scopes: Set<string>,
        callback: (deviceCodeResult: DeviceCodeResult) => Promise<void>) {
        return new AcquireTokenWithDeviceCodeParameterBuilder(executor, callback)
            .WithScopes(scopes);
    }

    private parameters: AcquireTokenWithDeviceCodeParameters;

    constructor(
        executor: IPublicClientApplicationExecutor,
        callback: (deviceCodeResult: DeviceCodeResult) => Promise<void>) {
        super(executor);
        this.parameters = new AcquireTokenWithDeviceCodeParameters(callback);
    }

    protected ExecuteInternalAsync(): Promise<AuthenticationResult> {
        return this.executor.ExecuteDeviceCodeAsync(this.commonParameters, this.parameters);
    }

// tslint:disable-next-line: no-empty
    protected Validate(): void { }
}
