export class CreationUsager {
    accountEnabled: boolean = true;
    displayName: string;
    mailNickname: string;
    userPrincipalName: string;
    passwordProfile: CreationUsagerMotDePasse;
    
    constructor(estActive: boolean, nom: string, logon: string, courriel: string, motDePasse: string) {
        this.accountEnabled = estActive;
        this.displayName = nom;
        this.mailNickname = logon;
        this.userPrincipalName = courriel;
        this.passwordProfile = new CreationUsagerMotDePasse(true, motDePasse);
    }
}

export class CreationUsagerMotDePasse {
    forceChangePasswordNextSignIn: boolean = true;
    password: string;

    constructor(forcer: boolean, motDePasse: string) {
        this.forceChangePasswordNextSignIn = forcer;
        this.password = motDePasse;        
    }
}

export interface CreationGroupe {
    description: string; //"Exemple de groupe créé à partir de l'api",
    displayName: string; //"Groupe pilotage",
    groupTypes: string[];
    mailEnabled: boolean;
    mailNickname: string; //"pilotage"
    securityEnabled: boolean;
}

export interface ModificationGroupe {
    description: string; //"Exemple de groupe créé à partir de l'api",
    displayName: string; //"Groupe pilotage",
}

export interface MembreGroupe {
    id: string;
    mail: string;
}