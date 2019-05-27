import { OAuth2Header } from "./OAuth2Header";

export class OAuth2Parameter {
    public static get ResponseType(): string { return "response_type"; }
    public static get GrantType(): string { return "grant_type"; }
    public static get ClientId(): string { return "client_id"; }
    public static get ClientSecret(): string { return "client_secret"; }
    public static get ClientAssertion(): string { return "client_assertion"; }
    public static get ClientAssertionType(): string { return "client_assertion_type"; }
    public static get RefreshToken(): string { return "refresh_token"; }
    public static get RedirectUri(): string { return "redirect_uri"; }
    public static get Resource(): string { return "resource"; }
    public static get Code(): string { return "code"; }
    public static get DeviceCode(): string { return "device_code"; }
    public static get Scope(): string { return "scope"; }
    public static get Assertion(): string { return "assertion"; }
    public static get RequestedTokenUse(): string { return "requested_token_use"; }
    public static get Username(): string { return "username"; }
    public static get Password(): string { return "password"; }

    // login_hint is not standard oauth2 parameter
    public static get LoginHint(): string { return "login_hint"; }

    public static get CorrelationId(): string { return OAuth2Header.CorrelationId; }
    public static get State(): string { return "state"; }

    public static get CodeChallengeMethod(): string { return "code_challenge_method"; }
    public static get CodeChallenge(): string { return "code_challenge"; }
    public static get CodeVerifier(): string { return "code_verifier"; }
    // correlation id is not standard oauth2 parameter
    public static get LoginReq(): string { return "login_req"; }
    public static get DomainReq(): string { return "domain_req"; }

    // prompt is not standard oauth2 parameter
    public static get Prompt(): string { return "prompt"; }

    // restrict_to_hint is not standard oauth2 parameter
    public static get ClientInfo(): string { return "client_info"; }

    // claims is not a standard oauth2 paramter
    public static get Claims(): string { return "claims"; }
}
