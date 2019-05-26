import { ApplicationConfiguration } from "./applicationConfiguration";

export abstract class AbstractApplicationBuilder<T extends AbstractApplicationBuilder<T>> {
    private config: ApplicationConfiguration;

    constructor(configuration: ApplicationConfiguration) {
        this.config = configuration;
    }

    get Config(): ApplicationConfiguration {
        return this.config;
    }

    public WithClientId(clientId: string): T {
        this.Config.ClientId = clientId;
        return this as unknown as T;
    }

    protected BuildConfiguration(): ApplicationConfiguration {
        this.Validate();
        return this.config;
    }

    protected Validate(): void {
        if (this.Config.ClientId === undefined) {
            throw new Error("no ClientId was specified");
        }
    }
}
