import { VNIC, Instance, Compartment, Image, AvailabilityDomain, InstanceState, VNICAttachment, ListInstancesParameters, CreateImageDetails, LaunchInstanceDetails, Vcn, Subnet } from './models';
export interface ClientConfig {
    key: string;
    tenantID: string;
    userID: string;
    fingerprint: string;
    zone: 'ap-tokyo-1' | 'ca-toronto-1' | 'eu-frankfurt-1' | 'uk-london-1' | 'us-ashburn-1' | 'us-phoenix-1';
}
export declare class Client {
    private keyId;
    private config;
    constructor(config: ClientConfig);
    private doRequest;
    util: {
        waitForInstanceState: (instanceId: string, state: InstanceState) => Promise<Instance>;
    };
    Core: {
        GetInstance: (id: string) => Promise<Instance>;
        ListInstances: (compartmentId: string, params?: ListInstancesParameters | undefined) => Promise<Instance[]>;
        InstanceAction: (id: string, action: "STOP" | "START" | "SOFTRESET" | "RESET" | "SOFTSTOP") => Promise<Instance>;
        ListVnicAttachments: (compartmentId: string, instanceId?: string | undefined) => Promise<VNICAttachment[]>;
        GetVnic: (vnicId: string) => Promise<VNIC>;
        ListImages: (compartmentId: string, operatingSystem: string, operatingSystemVersion: string) => Promise<Image[]>;
        LaunchInstance: (launchDetails: LaunchInstanceDetails) => Promise<Instance>;
        ListVcns: (compartmentId: string) => Promise<Vcn[]>;
        ListSubnets: (vcnId: string, compartmentId: string) => Promise<Subnet[]>;
        CreateImage: (imageDetails: CreateImageDetails) => Promise<Image>;
        DeleteImage: (imageId: string) => Promise<{}>;
    };
    IAM: {
        ListCompartments: () => Promise<Compartment[]>;
        ListAvailabilityDomains: (compartmentId: string) => Promise<AvailabilityDomain[]>;
    };
}
