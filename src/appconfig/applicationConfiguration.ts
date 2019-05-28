import { AuthorityInfo } from "./authorityInfo";
import { IApplicationConfiguration } from "./IApplicationConfiguration";

export class ApplicationConfiguration implements IApplicationConfiguration {
    public ExtraQueryParameters: Map<string, string>;
    public AuthorityInfo: AuthorityInfo | undefined;
    public IsExtendedTokenLifetimeEnabled: boolean;
    private clientId: string;

    constructor() {
        this.clientId = "";
        this.IsExtendedTokenLifetimeEnabled = false;
        this.ExtraQueryParameters = new Map<string, string>();
    }

    public set ClientId(value: string) {
        this.clientId = value;
    }

    public get ClientId(): string {
        return this.clientId;
    }
}
