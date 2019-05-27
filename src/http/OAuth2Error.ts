/// <summary>
/// OAuth2 errors that are only used internally. All error codes used when propagating exceptions should
/// be made public.
/// </summary>
export class OAuth2Error {
    public static get LoginRequired(): string { return "login_required"; }
    public static get AuthorizationPending(): string { return "authorization_pending"; }
}
