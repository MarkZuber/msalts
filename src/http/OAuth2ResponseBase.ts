
// This interface must have its parameters explicitly match
// the expected JSON
interface IOAuth2ResponseBasePayload {
    claims: string;
    error: string;
    suberror: string;
    error_description: string;
    error_codes: string[];
    correlation_id: string;
}

export class OAuth2ResponseBase {

    private claims: string;
    private error: string;
    private suberror: string;
    private errorDescription: string;
    private errorCodes: string[];
    private correlationId: string;

    constructor(payloadJson: any) {
        const payload: IOAuth2ResponseBasePayload = payloadJson;

        this.error = payload.error;
        this.claims = payload.claims;
        this.suberror = payload.suberror;
        this.errorDescription = payload.error_description;
        this.errorCodes = payload.error_codes;
        this.correlationId = payload.correlation_id;
    }

    public get Error(): string {
        return this.error;
    }

    public get SubError(): string {
        return this.suberror;
    }

    public get ErrorDescription(): string {
        return this.errorDescription;
    }

    public get ErrorCodes(): string[] {
        return this.errorCodes;
    }

    public get CorrelationId(): string {
        return this.correlationId;
    }

    public get Claims(): string {
        return this.claims;
    }
}
