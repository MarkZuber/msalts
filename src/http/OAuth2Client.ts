import { Url } from "url";
import { RequestContext } from "../core/RequestContext";
import { IHttpManager } from "./IHttpManager";
import { InstanceDiscoveryResponse } from "./InstanceDiscoveryResponse";
import { MsalTokenResponse } from "./MsalTokenResponse";
import { HttpResponse } from "./HttpResponse";

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
        return await this.ExecuteRequestAsync<InstanceDiscoveryResponse>(endpoint, HttpMethod.Get, requestContext);
    }

    public async GetTokenAsync(endPoint: Url, requestContext: RequestContext): Promise<MsalTokenResponse> {
        return await this.ExecuteRequestAsync<MsalTokenResponse>(endPoint, HttpMethod.Post, requestContext);
    }

    private async ExecuteRequestAsync<T>(
        endpoint: Url,
        httpMethod: HttpMethod,
        requestContext: RequestContext) : Promise<T> {

        // todo: telemetry correlation id
        // todo: clientname/clientversion

        const endpointUri = this.CreateFullEndpointUri(endpoint);

        var response: HttpResponse;

        if (httpMethod === httpMethod.Post) {
            response = await this.httpManager.SendPostAsync(endpointUri, this.headers, this.bodyParameters);
        } else {
            response = await this.httpManager.SendGetAsync(endpointUri, this.headers);
        }

        // todo: telemetry

        return this.CreateResponse<T>(response, requestContext);
    }

    private async CreateResponse<T>(response: HttpResponse, requestContext: RequestContext): Promise<T> {
        if (response.StatusCode !== HttpStatusCode.OK) {
            this.CreateErrorResponse(response, requestContext);
        }

        Object.create(typeof(T).prototype)

        return JsonHelper.DeserializeFromJson<T>(response.Body);

    }

    private CreateErrorResponse(response: HttpResponse, requestContext: RequestContext)

    }
}
