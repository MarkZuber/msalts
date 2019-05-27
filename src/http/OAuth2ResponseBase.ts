export class OAuth2ResponseBase {
    public Error: string;
    public SubError: string;
    public ErrorDescription: string;
    public ErrorCodes: string[];
    public CorrelationId: string;
    public Claims: string;
}
