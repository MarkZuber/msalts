import { OAuth2ResponseBaseClaim } from "./OAuth2ResponseBaseClaim";

export class TokenResponseClaim extends OAuth2ResponseBaseClaim {
    public static get Code(): string { return "code"; }
    public static get TokenType(): string { return "token_type"; }
    public static get AccessToken(): string { return "access_token"; }
    public static get RefreshToken(): string { return "refresh_token"; }
    public static get IdToken(): string { return "id_token"; }
    public static get Scope(): string { return "scope"; }
    public static get ClientInfo(): string { return "client_info"; }
    public static get ExpiresIn(): string { return "expires_in"; }
    public static get CloudInstanceHost(): string { return "cloud_instance_host_name"; }
    public static get CreatedOn(): string { return "created_on"; }
    public static get ExtendedExpiresIn(): string { return "ext_expires_in"; }
    public static get Authority(): string { return "authority"; }
    public static get FamilyId(): string { return "foci"; }
}
