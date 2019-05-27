import { Url } from "url";

export interface IHttpManager {
    SendPostAsync(
        endpoint: Url,
        headers: Map<string, string>,
        bodyParameters: Map<string, string>): Promise<HttpResponse>;
}
