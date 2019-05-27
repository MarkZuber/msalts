import { IApplicationConfiguration } from "../appconfig/IApplicationConfiguration";
import { IHttpManager } from "../http/IHttpManager";

export interface IServiceBundle {
    Config: IApplicationConfiguration;
    HttpManager: IHttpManager;
}
