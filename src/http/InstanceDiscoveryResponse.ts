import { InstanceDiscoveryMetadataEntry } from "./InstanceDiscoveryMetadataEntry";
import { OAuth2ResponseBase } from "./OAuth2ResponseBase";

interface IInstanceDiscoveryResponsePayload {
    tenant_discovery_endpoint: string;
    metadata: InstanceDiscoveryMetadataEntry[];
}

export class InstanceDiscoveryResponse extends OAuth2ResponseBase {
    private tenantDiscoveryEndpoint: string;
    private metadata: InstanceDiscoveryMetadataEntry[];

    constructor(payloadJson: any) {
        super(payloadJson);

        const payload: IInstanceDiscoveryResponsePayload = payloadJson;

        this.tenantDiscoveryEndpoint = payload.tenant_discovery_endpoint;
        this.metadata = payload.metadata;
    }

    public get TenantDiscoveryEndpoint(): string {
        return this.tenantDiscoveryEndpoint;
    }

    public get Metadata(): InstanceDiscoveryMetadataEntry[] {
        return this.metadata;
    }
}
