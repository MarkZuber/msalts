export class DeviceCodeResult {
    private userCode: string;
    private deviceCode: string;
    private verificationUrl: string;
    private expiresOn: Date;
    private interval: number;
    private message: string;
    private clientId: string;
    private scopes: Set<string>;

    constructor(
        userCode: string,
        deviceCode: string,
        verificationUrl: string,
        expiresOn: Date,
        interval: number,
        message: string,
        clientId: string,
        scopes: Set<string>) {
        this.userCode = userCode;
        this.deviceCode = deviceCode;
        this.verificationUrl = verificationUrl;
        this.expiresOn = expiresOn;
        this.interval = interval;
        this.message = message;
        this.clientId = clientId;
        this.scopes = scopes;
    }

    public get UserCode(): string {
        return this.userCode;
    }
    public get DeviceCode(): string {
        return this.deviceCode;
    }
    public get VerificationUrl(): string {
        return this.verificationUrl;
    }
    public get ExpiresOn(): Date {
        return this.expiresOn;
    }
    public get Interval(): number {
        return this.interval;
    }
    public get Message(): string {
        return this.message;
    }
    public get ClientId(): string {
        return this.clientId;
    }
    public get Scopes(): Set<string> {
        return this.scopes;
    }
}
