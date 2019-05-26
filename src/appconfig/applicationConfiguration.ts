import { IAppConfig } from "./appConfig";

export class ApplicationConfiguration implements IAppConfig {
    private clientId: string;

    constructor() {
        this.clientId = "";
    }

    set ClientId(value: string) {
        this.clientId = value;
    }

    get ClientId(): string {
        return this.clientId;
    }
}
