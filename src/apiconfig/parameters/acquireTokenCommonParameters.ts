import {AuthorityInfo} from "../../appconfig/authorityInfo";

export class AcquireTokenCommonParameters {
    private extraQueryParameters: Map<string, string>;
    private claims: string;
    private scopes: Set<string>;
    private authorityOverride: AuthorityInfo | undefined;

    constructor() {
        this.extraQueryParameters = new Map<string, string>();
        this.claims = "";
        this.scopes = new Set<string>();
    }

    public get ExtraQueryParameters(): Map<string, string> {
        return this.extraQueryParameters;
    }

    public set ExtraQueryParameters(extraQueryParameters: Map<string, string>) {
         this.extraQueryParameters = extraQueryParameters;
    }

    public get Scopes(): Set<string> {
        return this.scopes;
    }

    public set Scopes(scopes: Set<string>) {
         this.scopes = scopes;
    }

    public get Claims(): string {
        return this.claims;
    }

    public set Claims(claims: string) {
         this.claims = claims;
    }

    public get AuthorityOverride(): AuthorityInfo | undefined {
        return this.authorityOverride;
    }

    public set AuthorityOverride(authorityOverride: AuthorityInfo | undefined) {
        this.authorityOverride = authorityOverride;
    }
}
