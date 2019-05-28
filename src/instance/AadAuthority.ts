import { AuthorityInfo } from "../appconfig/authorityInfo";
import { IServiceBundle } from "../core/IServiceBundle";

export class AadAuthority {
    constructor(private serviceBundle: IServiceBundle, private authorityInfo: AuthorityInfo) {
    }
}
