export class PromptValue {
    public static get Login(): string { return "login"; }
    public static get RefreshSession(): string { return "refresh_session"; }
    // The behavior of this value is identical to prompt=none for managed users; However, for federated users, AAD
    // redirects to ADFS as it cannot determine in advance whether ADFS can login user silently (e.g. via WIA) or not.
    public static get AttemptNone(): string { return "attempt_none"; }
}
