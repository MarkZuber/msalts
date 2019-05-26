import { AbstractApplicationBuilder } from "./abstractApplicationBuilder";
import { ApplicationConfiguration } from "./applicationConfiguration";
import { IPublicClientApplication, PublicClientApplication } from "./publicClientApplication";

export class PublicClientApplicationBuilder extends AbstractApplicationBuilder<PublicClientApplicationBuilder> {

    public static create(clientId: string): PublicClientApplicationBuilder {
        return new PublicClientApplicationBuilder(new ApplicationConfiguration()).WithClientId(clientId);
    }

    private constructor(config: ApplicationConfiguration) {
        super(config);
    }

    public Build(): IPublicClientApplication {
        return new PublicClientApplication(this.BuildConfiguration());
    }
}
