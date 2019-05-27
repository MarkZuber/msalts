export class OAuth2Value {
    public static get ReservedScopes(): Set<string> {
        const s = new Set<string>();
        s.add(this.ScopeOpenId);
        s.add(this.ScopeProfile);
        s.add(this.ScopeOfflineAccess);
        return s;
    }

    public static get CodeChallengeMethodValue(): string { return "S256"; }
    public static get ScopeOpenId(): string { return "openid"; }
    public static get ScopeOfflineAccess(): string { return "offline_access"; }
    public static get ScopeProfile(): string { return "profile"; }
}
