import { AuthenticationResult } from "../contracts/authenticationResult";
import { AbstractAcquireTokenParameterBuilder } from "./abstractAcquireTokenParameterBuilder";
import { IPublicClientApplicationExecutor } from "./executors/IPublicClientApplicationExecutor";

export abstract class AbstractPublicClientAcquireTokenParameterBuilder
    <T extends AbstractPublicClientAcquireTokenParameterBuilder<T>>
    extends AbstractAcquireTokenParameterBuilder<T> {

    protected executor: IPublicClientApplicationExecutor;

    constructor(executor: IPublicClientApplicationExecutor) {
        super();
        this.executor = executor;
    }

    public async ExecuteAsync(): Promise<AuthenticationResult> {
        this.ValidateAndCalculateApiId();
        return this.ExecuteInternalAsync();
    }

    protected abstract async ExecuteInternalAsync(): Promise<AuthenticationResult>;
}