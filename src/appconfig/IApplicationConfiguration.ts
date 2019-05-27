import { IAppConfig } from "./appConfig";
import { AuthorityInfo } from "./authorityInfo";

export interface IApplicationConfiguration extends IAppConfig {
    AuthorityInfo: AuthorityInfo | undefined;
    IsExtendedTokenLifetimeEnabled: boolean;
}
