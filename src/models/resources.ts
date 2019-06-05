// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/Vnic/
export interface VNIC {
    availabilityDomain: string
    compartmentId: string
    definedTags?: any
    displayName?: string
    freeformTags?: any
    hostnameLabel?: string
    id: string
    isPrimary?: boolean
    lifecycleState: 'PROVISIONING' | 'AVAILABLE' | 'TERMINATING' | 'TERMINATED'
    macAddress?: string
    privateIp?: string
    publicIp?: string
    skipSourceDestCheck?: boolean
    subnetId: string
    timeCreated?: string
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/VnicAttachment/
export interface VNICAttachment {
    availabilityDomain: string
    compartmentId: string
    displayName?: string;
    id: string;
    instanceId: string;
    lifecycleState: 'ATTACHING' | 'ATTACHED' | 'DETACHING' | 'DETACHED'
    nicIndex?: number;
    subnetId: string;
    timeCreated: string;
    vlanTag?: number;
    vnicId?: string;
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/LaunchOptions
export interface LaunchOptions {
    bootVolumeType: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED'
    firmware: string
    networkType: string
    remoteDataVolume: 'ISCSI' | 'SCSI' | 'IDE' | 'VFIO' | 'PARAVIRTUALIZED'
    isPvEncryptionInTransitEnabled?: boolean
    isConsistentVolumeNamingEnabled?: boolean
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/InstanceSourceDetails
export interface InstanceSourceDetails {
    sourceType: 'bootVolume' | 'image'
}
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/InstanceAgentConfig
export interface InstanceAgentConfigReference {
    isMonitoringDisabled?: boolean
}
// https://docs.cloud.oracle.com/iaas/api/#/en/identity/20160918/Compartment/
export interface Compartment {
    id: string
    compartmentId: string
    name: string
    description: string
    timeCreated: string
    lifecycleState: 'CREATING' | 'ACTIVE' | 'INACTIVE' | 'DELETING' | 'DELETED'
    inactiveStatus?: boolean
    isAccessible?: boolean
    freeformTags?: any
    definedTags?: any
}
// InstanceState
export type InstanceState = 'PROVISIONING' | 'RUNNING' | 'STARTING' | 'STOPPING' | 'STOPPED' | 'CREATING_IMAGE' | 'TERMINATING' | 'TERMINATED'
// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/Instance
export interface Instance {
    availabilityDomain: string
    compartmentId: string
    definedTags?: any
    displayName?: string
    extendedMetadata?: any
    faultDomain?: string
    freeformTags?: any
    id: string
    imageId?: string
    ipxeScript?: string
    launchMode?: 'NATIVE' | 'EMULATED' | 'CUSTOM'
    launchOptions?: LaunchOptions
    lifecycleState: InstanceState
    metadata?: any
    region: string
    shape: string
    sourceDetails: InstanceSourceDetails
    timeCreated: string
    agentConfig?: InstanceAgentConfigReference
    timeMaintenanceRebootDue?: string
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/Image/
export interface Image {
    baseImageId?: string
    compartmentId: string
    createImageAllowed: boolean
    definedTags?: any
    displayName?: string
    freeformTags?: any
    id: string
    launchMode?: string
    launchOptions?: LaunchOptions
    lifecycleState: string
    operatingSystem: string
    operatingSystemVersion: string
    agentFeatures?: InstanceAgentFeatures
    sizeInMBs?: number
    timeCreated: string 
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/InstanceAgentFeatures
export interface InstanceAgentFeatures {
    isMonitoringSupported?: boolean
}

// https://docs.cloud.oracle.com/iaas/api/#/en/identity/20160918/AvailabilityDomain/
export interface AvailabilityDomain {
    name?: string
    id?: string
    compartmentId: string
}

export interface LaunchInstanceDetails {
    availabilityDomain: string,
    compartmentId: string,
    displayName?: string,
    metadata?: any,
    shape: string,
    sourceDetails?: InstanceSourceDetails,
    subnetId?: string,
    imageId?: string
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/Vcn/
export interface Vcn {
    cidrBlock: string,
    compartmentId: string,
    defaultDhcpOptionsId?: string,
    defaultRouteTableId?: string,
    defaultSecurityListId?: string,
    definedTags?: any,
    displayName?: string,
    dnsLabel?: string,
    freeformTags?: any,
    id: string,
    lifecycleState: string,
    timeCreated?: string,
    vcnDomainName?: string
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/Subnet/
export interface Subnet {
    availabilityDomain?: string,
    cidrBlock: string,
    compartmentId: string,
    definedTags?: any,
    dhcpOptionsId?: string,
    displayName?: string,
    dnsLabel?: string,
    freeformTags?: any,
    id: string,
    lifecycleState: string,
    prohibitPublicIpOnVnic?: boolean,
    routeTableId: string,
    securityListIds?: string,
    subnetDomainName?: string,
    timeCreated?: string,
    vcnId: string,
    virtualRouterIp: string,
    virtualRouterMac: string
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/ImageSourceViaObjectStorageUriDetails
export interface ImageSourceDetails {
    operatingSystem?: string,
    operatingSystemVersion?: string,
    sourceImageType?: string,
    sourceType: "objectStorageUri",
    sourceUri: string
}

// https://docs.cloud.oracle.com/iaas/api/#/en/iaas/20160918/datatypes/CreateImageDetails
export interface CreateImageDetails {
    compartmentId: string,
    definedTags?: any,
    displayName?: string,
    freeformTags?: any,
    imageSourceDetails: ImageSourceDetails,
    instanceId?: string,
    launchMode?: string
}

