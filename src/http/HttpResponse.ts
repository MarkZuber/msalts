import { stringify } from "querystring";

export class HttpResponse {

    public Headers: Map<string, string>;
    public StatusCode: number | undefined;
    public UserAgent: string;
    public Body: string;

    constructor(
        headers: Map<string, string>,
        statusCode: number | undefined,
        userAgent: string,
        body: string) {
        this.Headers = headers;
        this.StatusCode = statusCode;
        this.UserAgent = userAgent;
        this.Body = body;
    }
}
