import * as httpm from 'typed-rest-client/HttpClient';
import { Url } from "url";
import { RequestContext } from "../core/RequestContext";
import { HttpMethod } from "./HttpMethod";
import { HttpResponse } from "./HttpResponse";
import { IHttpManager } from "./IHttpManager";
import { InstanceDiscoveryResponse } from "./InstanceDiscoveryResponse";
import { MsalTokenResponse } from "./MsalTokenResponse";
import { OAuth2ResponseBase } from './OAuth2ResponseBase';

class ResponseCreator<T extends OAuth2ResponseBase> {
    constructor(private instanceType: new(json: any) => T) {
    }

    public Deserialize(json: any): T {
        return new this.instanceType(json);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class OAuth2Client {
    private bodyParameters: Map<string, string>;
    private headers: Map<string, string>;
    private queryParameters: Map<string, string>;
    private httpManager: IHttpManager;

    constructor(httpManager: IHttpManager) {
        this.httpManager = httpManager;
        this.bodyParameters = new Map<string, string>();
        this.headers = new Map<string, string>();
        this.queryParameters = new Map<string, string>();
    }

    public AddQueryParameter(key: string, value: string) {
        // todo: ensure key and value are not null or empty
        this.queryParameters.set(key, value);
    }

    public AddBodyParameter(key: string, value: string) {
        // todo: ensure key and value are not null or empty
        this.bodyParameters.set(key, value);
    }

    public async DiscoverAadInstanceAsync(
        endpoint: Url,
        requestContext: RequestContext) : Promise<InstanceDiscoveryResponse> {
        return await this.ExecuteRequestAsync<InstanceDiscoveryResponse>(
            InstanceDiscoveryResponse,
            endpoint,
            HttpMethod.Get,
            requestContext);
    }

    public async GetTokenAsync(endPoint: Url, requestContext: RequestContext): Promise<MsalTokenResponse> {
        return await this.ExecuteRequestAsync<MsalTokenResponse>(
            MsalTokenResponse,
            endPoint,
            HttpMethod.Post,
            requestContext);
    }

    private async ExecuteRequestAsync<T extends OAuth2ResponseBase>(
        responseType: new (json: any) => T,
        endpoint: Url,
        httpMethod: HttpMethod,
        requestContext: RequestContext): Promise<T> {

        // todo: telemetry correlation id
        // todo: clientname/clientversion

        const endpointUri = endpoint; // todo: this.CreateFullEndpointUrl(endpoint);

        let response: HttpResponse;

        if (httpMethod === HttpMethod.Post) {
            response = await this.httpManager.SendPostAsync(endpointUri, this.headers, this.bodyParameters);
        } else {
            response = await this.httpManager.SendGetAsync(endpointUri, this.headers);
        }

        // todo: telemetry

        return this.CreateResponse<T>(responseType, response, requestContext);
    }

    private async CreateResponse<T extends OAuth2ResponseBase>(
        responseType: new (json: any) => T,
        response: HttpResponse,
        requestContext: RequestContext): Promise<T> {

        if (response.StatusCode !== httpm.HttpCodes.OK) {
            this.CreateErrorResponse(response, requestContext);
        }

        const json = JSON.parse(response.Body);
        const creator = new ResponseCreator<T>(responseType);
        return creator.Deserialize(json);
    }

    private CreateErrorResponse(
        response: HttpResponse,
// tslint:disable-next-line: no-empty
        requestContext: RequestContext) {
        // todo: implement error handling
    }
}
