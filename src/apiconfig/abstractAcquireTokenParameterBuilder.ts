import { AuthorityInfo } from "../appconfig/authorityInfo";
import { List } from "../collections/list";
import { Map } from "../collections/map";
import { AuthenticationResult } from "../contracts/authenticationResult";
import { AcquireTokenCommonParameters } from "./parameters/acquireTokenCommonParameters";

export abstract class AbstractAcquireTokenParameterBuilder<T extends AbstractAcquireTokenParameterBuilder<T>> {
    protected commonParameters: AcquireTokenCommonParameters;

    constructor() {
        this.commonParameters = new AcquireTokenCommonParameters();
    }

    public abstract async ExecuteAsync(): Promise<AuthenticationResult>;

    public WithExtraQueryParameters(extraQueryParameters: Map<string>): T {
        this.commonParameters.ExtraQueryParameters = extraQueryParameters;
        return this as unknown as T;
    }

    public WithExtraQueryParametersAsString(extraQueryParameters: string): T {
        throw new Error("Not implemented");
    }

    public WithClaims(claims: string): T {
        this.commonParameters.Claims = claims;
        return this as unknown as T;
    }

    public WithAuthority(authorityUri: string, validateAuthority: boolean): T {

        if (authorityUri === null) {
            throw new Error("must provide authorityUri");
        }

        this.commonParameters.AuthorityOverride = AuthorityInfo.CreateFromAuthorityUri(authorityUri, validateAuthority);

        return this as unknown as T;
    }

    protected WithScopes(scopes: Set<string>): T {
        this.commonParameters.Scopes = scopes;
        return this as unknown as T;
    }

    protected abstract Validate(): void;

    protected ValidateAndCalculateApiId() {
        // todo: calculate api id for telemetry
        this.Validate();
    }
}
