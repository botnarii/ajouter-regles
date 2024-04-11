import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Groupe } from "../../../Models/usagers.model";
import { GestionGroupeService } from "../../Service/gestion-groupe.service";
import { CreationGroupeForm } from "../Forms/groupe.form";
import { CreationGroupe } from "../../../Models/creation.model";

@Component({
    selector: 'app-ajout-groupe',
    templateUrl: './ajout-groupe.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [GestionGroupeService]
})
export class AjoutGroupeComponent {
    titre: string = 'Modfier';

    serviceGroupes = inject(GestionGroupeService);
    formulaire = new CreationGroupeForm();

    groupe = signal<Groupe|null>(null);

    creer(): void {
        const input = this.formulaire.value as CreationGroupe;
        input.groupTypes = ['Unified'];
        input.mailEnabled = true;
        input.securityEnabled = true;
        this.serviceGroupes.creer(input).subscribe({
            next: data => {
                alert("succes");
                this.assignerRole(data.id);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    assignerRole(idGroupe: string): void {
        this.serviceGroupes.assignerRole(idGroupe).subscribe({
            next: data => {
                alert("succes assigner role");
            },
            error: error => {
                alert("Echec assigner role");
            }
        });
    }

}