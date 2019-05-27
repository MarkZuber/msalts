import * as httpm from 'typed-rest-client/HttpClient';
import { Url } from "url";
import { HttpResponse } from "./HttpResponse";
import { IHttpClientFactory } from './IHttpClientFactory';
import { IHttpManager } from "./IHttpManager";

export class HttpManager implements IHttpManager {

    private httpClientFactory: IHttpClientFactory;

    constructor(httpClientFactory: IHttpClientFactory) {
        this.httpClientFactory = httpClientFactory;
    }

    public async SendGetAsync(
        endpoint: Url, headers: Map<string, string>): Promise<HttpResponse> {

        const httpc = this.httpClientFactory.GetHttpClient();

        const res: httpm.HttpClientResponse = await httpc.get(endpoint.toString(), headers);
        const body: string = await res.readBody();

        return new HttpResponse(
            new Map<string, string>(), // todo: response headers: res.message.headers,
            res.message.statusCode,
            httpc.userAgent,
            body);
    }

    public async SendPostAsync(
        endpoint: Url,
        headers: Map<string, string>,
        bodyParameters: Map<string, string>): Promise<HttpResponse> {

        const httpc = this.httpClientFactory.GetHttpClient();

        const res: httpm.HttpClientResponse = await httpc.post(
            endpoint.toString(),
            JSON.stringify(bodyParameters), headers);

        const body: string = await res.readBody();

        return new HttpResponse(
            new Map<string, string>(), // todo: response headers: res.message.headers,
            res.message.statusCode,
            httpc.userAgent,
            body);
    }
}
