export interface ReponseHttp<T> {
    context: string;
    value: T;
}

export interface Usager {
    businessPhones: string[];
    displayName: string;
    givenName: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
}

export interface Role {
    id: string;
    deletedDateTime: null,
    appRoleId: string;
    createdDateTime: string;
    principalDisplayName: string;
    principalId: string;
    principalType: string;
    resourceDisplayName: string;
    resourceId: string;
}

export interface Groupe {
    id: string;
    deletedDateTime: string;
    classification: string;
    createdDateTime: string;
    description: string;
    displayName: string;
    expirationDateTime: string;
    groupTypes:string[];
    isAssignableToRole: boolean;
    mail: string;
    mailEnabled: boolean,
    mailNickname: string;
    membershipRule: string;
    membershipRuleProcessingState: string;
    onPremisesLastSyncDateTime: string;
    onPremisesSecurityIdentifier: string;
    onPremisesSyncEnabled: string;
    preferredDataLocation: string;
    preferredLanguage: string;
    proxyAddresses: string[];
    renewedDateTime: string;
    resourceBehaviorOptions: string[];
    resourceProvisioningOptions: string[];
    securityEnabled: boolean;
    theme: string;
    visibility: string;
    onPremisesProvisioningErrors: string[];
}