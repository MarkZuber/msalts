import { DeviceCodeResult } from "../../contracts/DeviceCodeResult";
import { IAcquireTokenParameters } from "./IAcquireTokenParameters";

export class AcquireTokenWithDeviceCodeParameters implements IAcquireTokenParameters {
    private deviceCodeResultCallback: (deviceCodeResult: DeviceCodeResult) => Promise<void>;

    constructor(callback: (deviceCodeResult: DeviceCodeResult) => Promise<void>) {
        this.deviceCodeResultCallback = callback;
    }

    // tslint:disable-next-line: no-empty
    public LogParameters(): void {}

    public get DeviceCodeResultCallback(): (deviceCodeResult: DeviceCodeResult) => Promise<void> {
        return this.deviceCodeResultCallback;
    }

    public set DeviceCodeResultCallback(
        deviceCodeResultCallback: (deviceCodeResult: DeviceCodeResult) => Promise<void>) {
        this.deviceCodeResultCallback = deviceCodeResultCallback;
    }
}
