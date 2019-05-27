import { Url } from "url";
import { HttpResponse } from "./HttpResponse";

export interface IHttpManager {
    SendGetAsync(
        endpoint: Url,
        headers: Map<string, string>): Promise<HttpResponse>;
    SendPostAsync(
        endpoint: Url,
        headers: Map<string, string>,
        bodyParameters: Map<string, string>): Promise<HttpResponse>;
}
