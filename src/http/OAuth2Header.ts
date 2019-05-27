export class OAuth2Header {
    public static get CorrelationId(): string { return "client-request-id"; }
    public static get RequestCorrelationIdInResponse(): string { return "return-client-request-id"; }
    public static get AppName(): string { return "x-app-name"; }
    public static get AppVer(): string { return "x-app-ver"; }
}
