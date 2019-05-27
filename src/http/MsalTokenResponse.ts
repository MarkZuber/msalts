import { IFromJsonable } from "./IFromJsonable";
import { OAuth2ResponseBase } from "./OAuth2ResponseBase";

function staticImplements<T>() {
// tslint:disable-next-line: no-unused-expression
    return <U extends T>(constructor: U) => {constructor};
}

@staticImplements<IFromJsonable>()
export class MsalTokenResponse extends OAuth2ResponseBase {
    public TokenType: string;
    public AccessToken: string;
    public RefreshToken: string;
    public Scope: string;
    public ClientInfo: string;
    public IdToken: string;
    public AccessTokenExpiresOn: Date;
    public AccessTokenExtendedExpiresOn: Date;
    public FamilyId: string;

    private expiresIn: number;
    private extendedExpiresIn: number;
    private authority: string;

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
