import { OAuth2ResponseBase } from "./OAuth2ResponseBase";

interface IMsalTokenResponsePayload {
    token_type: string;
    access_token: string;
    refresh_token: string;
    id_token: string;
    scope: string;
    client_info: string;
    expires_in: number;
    cloud_instance_host_name: string;
    // created_on: number;
    ext_expires_in: number;
    authority: string;
    foci: string;
}

export class MsalTokenResponse extends OAuth2ResponseBase {
    private tokenType: string;
    private accessToken: string;
    private refreshToken: string;
    private scope: string;
    private clientInfo: string;
    private idToken: string;
    // private accessTokenExpiresOn: Date;
    // private accessTokenExtendedExpiresOn: Date;
    private familyId: string;

    private expiresIn: number;
    private extendedExpiresIn: number;
    private authority: string;

    constructor(payloadJson: any) {
        super(payloadJson);

        const payload: IMsalTokenResponsePayload = payloadJson;
        this.tokenType = payload.token_type;
        this.accessToken = payload.access_token;
        this.refreshToken = payload.refresh_token;
        this.scope = payload.scope;
        this.clientInfo = payload.client_info;
        this.idToken = payload.id_token;
        // this.accessTokenExpiresOn = payload.token_type;
        // this.accessTokenExtendedExpiresOn = payload.token_type;
        this.familyId = payload.foci;

        this.expiresIn = 0; // todo:
        this.extendedExpiresIn = 0; // todo:
        this.authority = payload.authority;
    }

    public get ExpiresIn(): number {
        return this.expiresIn;
    }

    public set ExpiresIn(expiresIn: number) {
        this.expiresIn = expiresIn;
        // todo: this.AccessTokenExpiresOn = Date.now() + Date.FromSeconds(this.expiresIn);
    }


    public get ExtendedExpiresIn(): number {
        return this.extendedExpiresIn;
    }

    public set ExtendedExpiresIn(extendedExpiresIn: number) {
        this.extendedExpiresIn = extendedExpiresIn;
        // todo: this.AccessTokenExtendedExpiresOn = Date.now() + Date.FromSeconds(this.extendedExpiresIn);
    }

    public get Authority(): string {
        return this.authority;
    }
}
