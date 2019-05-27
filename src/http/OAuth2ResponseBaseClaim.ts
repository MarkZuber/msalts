export class OAuth2ResponseBaseClaim {
    public static get Claims(): string { return "claims"; }
    public static get Error(): string { return "error"; }
    public static get SubError(): string { return "suberror"; }
    public static get ErrorDescription(): string { return "error_description"; }
    public static get ErrorCodes(): string { return "error_codes"; }
    public static get CorrelationId(): string { return "correlation_id"; }
}
