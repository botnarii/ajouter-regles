import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Usager } from "../Models/usagers.model";

export class CreationUsagerForm extends FormGroup {
    
    constructor() {
        super({
            accountEnabled: new FormControl(true, Validators.required),
            displayName: new FormControl(null, [Validators.required]),
            mailNickname: new FormControl(null, [Validators.required]),
            userPrincipalName: new FormControl(null, [Validators.required, Validators.email]),
            passwordProfile: new FormGroup({
                forceChangePasswordNextSignIn: new FormControl(true),
                password: new FormControl(null, [Validators.required])
            }),
        });
        
    }
}

export class ModificationUsagerForm extends FormGroup {
    
    constructor(input: Usager | null) {
        super({
            displayName: new FormControl(input?.displayName, [Validators.required]),
        });
        
    }
}