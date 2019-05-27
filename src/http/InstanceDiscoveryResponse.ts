import { InstanceDiscoveryMetadataEntry } from "./InstanceDiscoveryMetadataEntry";
import { OAuth2ResponseBase } from "./OAuth2ResponseBase";

export class InstanceDiscoveryResponse extends OAuth2ResponseBase {
    public TenantDiscoveryEndpoint: string;
    public Metadata: InstanceDiscoveryMetadataEntry[];
}
