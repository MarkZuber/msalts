import { AuthorityInfo } from "../appconfig/authorityInfo";
import { AuthorityType } from "../appconfig/authorityType";
import { IServiceBundle } from "../core/IServiceBundle";
import { AadAuthority } from "./AadAuthority";

export class Authority {

    public static CreateAuthorityFromServiceBundle(serviceBundle: IServiceBundle): Authority {
        return Authority.CreateAuthorityWithOverride(serviceBundle, serviceBundle.Config.AuthorityInfo);
    }

    public static CreateAuthority(
        serviceBundle: IServiceBundle,
        authority: string,
        validateAuthority: boolean): Authority {
        return Authority.CreateAuthorityWithOverride(
            serviceBundle,
            AuthorityInfo.CreateFromAuthorityUri(authority, validateAuthority));
    }

    public static CreateAuthorityWithOverride(
        serviceBundle: IServiceBundle,
        authorityInfo: AuthorityInfo): Authority {

        switch (authorityInfo.AuthorityType) {
            case AuthorityType.Aad:
                return new AadAuthority(serviceBundle, authorityInfo);
            default:
                throw new Error("Unsupported authority type");
        }
    }
}
