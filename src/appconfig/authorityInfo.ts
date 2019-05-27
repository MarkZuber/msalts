import { AuthorityType } from "./authorityType";

export class AuthorityInfo {

    public static CreateFromAuthorityUri(authorityUri: string, validateAuthority: boolean): AuthorityInfo {
        const canonicalUri = AuthorityInfo.CanonicalizeAuthorityUri(authorityUri);
        AuthorityInfo.ValidateAuthorityUri(canonicalUri);

        const authorityType = AuthorityInfo.GetAuthorityType(canonicalUri);

        if (authorityType === AuthorityType.B2C) {
            validateAuthority = false;
        }

        return new AuthorityInfo(authorityType, canonicalUri, validateAuthority);
    }

    public static GetAuthorityType(authority: string): AuthorityType {
        // todo: implement adfs/b2c
        return AuthorityType.Aad;
    }

    private static ValidateAuthorityUri(authority: string) {}

    private static CanonicalizeAuthorityUri(uri: string): string {
        // if (!string.IsNullOrWhiteSpace(uri) && !uri.EndsWith("/", StringComparison.OrdinalIgnoreCase))
        // {
        //     uri = uri + "/";
        // }

        return uri.toLowerCase();
    }

    private host: string;
    private canonicalAuthority: string;
    private authorityType: AuthorityType;
    private userRealmUriPrefix: string;
    private validateAuthority: boolean;

    constructor(authorityType: AuthorityType, authority: string, validateAuthority: boolean) {
        this.authorityType = authorityType;
        this.validateAuthority = validateAuthority;

        this.host = "";
        this.canonicalAuthority = "";
        this.userRealmUriPrefix = "";

        // this.host = new UriBuilder(authority).Host;
        // todo: add more here...
    }

    public get Host(): string {
        return this.host;
    }

    public get CanonicalAuthority(): string {
        return this.canonicalAuthority;
    }

    public set CanonicalAuthority(canonicalAuthority: string) {
        this.canonicalAuthority = canonicalAuthority;
    }

    public get AuthorityType(): AuthorityType {
        return this.authorityType;
    }

    public get UserRealmUriPrefix(): string {
        return this.userRealmUriPrefix;
    }

    public get ValidateAuthority(): boolean {
        return this.validateAuthority;
    }
}
