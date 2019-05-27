import { AuthenticationResult } from "../../contracts/authenticationResult";
import { AcquireTokenCommonParameters } from "../parameters/acquireTokenCommonParameters";
import { AcquireTokenWithDeviceCodeParameters } from "../parameters/AcquiretokenWithDeviceCodeParameters";

export interface IPublicClientApplicationExecutor {
    ExecuteDeviceCodeAsync(
        commonParameters: AcquireTokenCommonParameters,
        withDeviceCodeParameters: AcquireTokenWithDeviceCodeParameters) : Promise<AuthenticationResult>;
}
