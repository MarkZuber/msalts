export class OAuth2GrantType {
    public static get AuthorizationCode(): string { return "authorization_code"; }
    public static get RefreshToken(): string { return "refresh_token"; }
    public static get ClientCredentials(): string { return "client_credentials"; }
    public static get Saml11Bearer(): string { return "urn:ietf:params:oauth:grant-type:saml1_1-bearer"; }
    public static get Saml20Bearer(): string { return "urn:ietf:params:oauth:grant-type:saml2-bearer"; }
    public static get JwtBearer(): string { return "urn:ietf:params:oauth:grant-type:jwt-bearer"; }
    public static get Password(): string { return "password"; }
    public static get DeviceCode(): string { return "device_code"; }
}
