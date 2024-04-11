import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from "@angular/core";
import { GestionGroupeService } from "../Service/gestion-groupe.service";
import { Groupe, Usager } from "../../Models/usagers.model";
import { ReactiveFormsModule } from "@angular/forms";
import { ModificationGroupeForm } from "./Forms/groupe.form";
import { CreationUsager, MembreGroupe, ModificationGroupe } from "../../Models/creation.model";
import { UserService } from "../../user.service";

@Component({
    selector: 'app-groupe',
    templateUrl: './groupe.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [GestionGroupeService]
})
export class GroupeComponent implements OnInit, OnChanges {
    @Input({ required: false }) idGroupe!: string;

    serviceGroupes = inject(GestionGroupeService);
    serviceUsagers = inject(UserService);
    formulaire: ModificationGroupeForm | null = null;

    listeUtilisateurs = signal<Usager[]>([]);
    listeMembres = signal<MembreGroupe[]>([]);

    enTraitement = signal(false);

    listeMembresComplete = computed(() => {
        return this.listeUtilisateurs()?.sort((a, b) => a.displayName.localeCompare(b.displayName))?.map((x) => {
            const element = x as UsagerAffichage;
            const membre = this.listeMembres().find(m => m.id === x.id);
            element.estMemebre = !!membre;
            return element;
        });
    });

    groupe = signal<Groupe | null>(null);

    ngOnInit(): void {
        this.obtenirGroupe();
        this.obtenirListeUsagersComplete();
        this.obtenirListeMembres();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.obtenirGroupe();
        this.obtenirListeUsagersComplete();
        this.obtenirListeMembres();
    }

    modifier(): void {
        this.serviceGroupes.modifier(this.idGroupe, this.formulaire?.value).subscribe({
            next: data => {
                alert("succes");
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    obtenirGroupe() {
        this.serviceGroupes.obtenir(this.idGroupe).subscribe({
            next: data => {
                this.groupe.set(data);
                const inputModification: Partial<ModificationGroupe> = { description: data.description, displayName: data.displayName }
                this.formulaire = new ModificationGroupeForm(inputModification);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    obtenirListeUsagersComplete() {
        this.serviceUsagers.obtenirListe().subscribe({
            next: data => {
                this.listeUtilisateurs.set(data.value);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    obtenirListeMembres() {
        this.serviceGroupes.obtenirListeMembres(this.idGroupe).subscribe({
            next: data => {
                this.listeMembres.set(data.value);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    onMembreChange(even: any, membreId: string) {
        if (even.target.checked === true) {
            this.inviterMembre(membreId);
        } else {
            this.desinviterMembre(membreId);
        }
    }

    inviterMembre(membreId: string) {
        this.enTraitement.set(true);
        this.serviceGroupes.inviter(this.idGroupe, membreId).subscribe({
            next: data => {
                this.enTraitement.set(false);
            },
            error: error => {
                alert("Echec");
                this.enTraitement.set(false);
            }
        });
    }

    desinviterMembre(membreId: string) {
        this.enTraitement.set(true);
        this.serviceGroupes.desinviter(this.idGroupe, membreId).subscribe({
            next: data => {
                this.enTraitement.set(false);
            },
            error: error => {
                alert("Echec");
                this.enTraitement.set(false);
            }
        });
    }

}

export class UsagerAffichage implements Usager {
    businessPhones!: string[];
    displayName!: string;
    givenName!: string;
    jobTitle!: string;
    mail!: string;
    mobilePhone!: string;
    officeLocation!: string;
    preferredLanguage!: string;
    surname!: string;
    userPrincipalName!: string;
    id!: string;
    
    estMemebre: boolean = false;
}