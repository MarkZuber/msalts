export class AuthorityEndpoints {
    constructor(
        private authorizationEndpoint: string, 
        private tokenEndpoint: string, 
        private selfSignedJwtAudience: string) {
    }

    public get AuthorizationEndoint(): string {
        return this.authorizationEndpoint;
    }

    public get TokenEndpoint(): string {
        return this.tokenEndpoint;
    }

    public get SelfSignedJwtAudience(): string {
        return this.selfSignedJwtAudience;
    }
}
