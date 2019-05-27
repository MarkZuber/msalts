import { OAuth2ResponseBase } from "./OAuth2ResponseBase";

interface IDeviceCodeResponsePayload {
    user_code: string;
    device_code: string;
    verification_url: string;
    verification_uri: string;
    expires_in: number;
    interval: number;
    message: string;
}

export class DeviceCodeResponse extends OAuth2ResponseBase {
    private userCode: string;
    private deviceCode: string;
    private verificationUri: string;
    private expiresIn: number;
    private interval: number;
    private message: string;

    constructor(payloadJson: any) {
        super(payloadJson);

        const payload: IDeviceCodeResponsePayload = payloadJson;
        this.userCode = payload.user_code;
        this.deviceCode = payload.device_code;
        this.verificationUri = payload.verification_uri;
        this.expiresIn = payload.expires_in;
        this.interval = payload.interval;
        this.message = payload.message;
    }

    public get UserCode(): string {
        return this.userCode;
    }
    public get DeviceCode(): string {
        return this.deviceCode;
    }
    public get VerificationUri(): string {
        return this.verificationUri;
    }
    public get ExpiresIn(): number {
        return this.expiresIn;
    }
    public get Interval(): number {
        return this.interval;
    }
    public get Message(): string {
        return this.message;
    }
}
