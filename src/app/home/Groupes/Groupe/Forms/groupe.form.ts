import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModificationGroupe } from "../../../Models/creation.model";

export class ModificationGroupeForm extends FormGroup {
    
    constructor(input: Partial<ModificationGroupe>) {
        super({
            displayName: new FormControl(input.displayName, [Validators.required]),
            description: new FormControl(input.description, [Validators.required])
        });
        
    }
}

export class CreationGroupeForm extends FormGroup {
    
    constructor() {
        super({
            displayName: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required]),
            mailNickname: new FormControl(null, [Validators.required])
        });
    }
}