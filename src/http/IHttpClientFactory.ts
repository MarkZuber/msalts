import * as httpm from 'typed-rest-client/HttpClient';

export interface IHttpClientFactory {
    GetHttpClient(): httpm.HttpClient;
}
