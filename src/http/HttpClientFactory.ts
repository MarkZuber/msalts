import * as httpm from 'typed-rest-client/HttpClient';
import { IHttpClientFactory } from "./IHttpClientFactory";

export class HttpClientFactory implements IHttpClientFactory {
    public GetHttpClient(): httpm.HttpClient {
        return new httpm.HttpClient('todo what should the useragent be');
    }
}
