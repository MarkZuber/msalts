import { IAppConfig } from "./appConfig";
import { ApplicationConfiguration } from "./applicationConfiguration";

export interface IClientApplicationBase {
    Config: IAppConfig;
}

export abstract class ClientApplicationBase implements IClientApplicationBase {
    private config: IAppConfig;

    constructor(config: ApplicationConfiguration) {
        this.config = config;
    }

    get Config(): IAppConfig {
        return this.config;
    }
}
