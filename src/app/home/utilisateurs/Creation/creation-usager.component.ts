import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModificationUsagerService } from "../Modification/Service/modification-usager.service";
import { Router } from "@angular/router";
import { CreationUsager } from "../../Models/creation.model";
import { CreationUsagerForm } from "../../Forms/creation.form";

@Component({
    selector: 'app-modifier-utilisateur',
    templateUrl: './creation-usager.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [ModificationUsagerService]
})
export class CreationUsagerComponent {
    creationService = inject(ModificationUsagerService);
    router = inject(Router);

    etapeCreation = signal(true);
    etapeInvitation = signal(false);

    formulaireAjout: CreationUsagerForm;

    constructor() {
        this.formulaireAjout = new CreationUsagerForm();
    }

    createUser(): void {
        const valeurs = this.formulaireAjout.value as CreationUsager;
        this.creationService.create(valeurs).subscribe({
            next: data => {
                this.router.navigate(['/liste-utilisateurs']);
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }

    inviterUser(): void {
        const valeurs = this.formulaireAjout.value as CreationUsager;
        this.creationService.invite(valeurs.userPrincipalName).subscribe({
            next: data => {
                this.router.navigate(['/liste-utilisateurs']);
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }

    allerALEtapeInviter(): void {
        this.etapeCreation.set(false);
        this.etapeInvitation.set(true);
    }

    allerALEtapeCreer(): void {
        this.etapeCreation.set(true);
        this.etapeInvitation.set(false);
    }
}