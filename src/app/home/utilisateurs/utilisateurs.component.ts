import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { UserService } from "../user.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ModificationUsagerService } from "./Modification/Service/modification-usager.service";
import { Usager } from "../Models/usagers.model";


@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule],
    providers: [ModificationUsagerService]
})
export class UtilisateursComponent implements OnInit {

    serviceConsultationUtilisateur = inject(UserService);
    serviceMajUtilisateur = inject(ModificationUsagerService);
    router = inject(Router);
    filtreRecherche = signal('');
    valeur: string = '';
    listeUtilisateurs = signal<Usager[] | null>([]);

    listeResultat = computed(() => {
        const filtreTest = this.filtreRecherche();
        return this.listeUtilisateurs()?.sort((a, b) => a.displayName.localeCompare(b.displayName))?.filter(x => x.displayName.toLowerCase()?.includes(filtreTest.toLowerCase()));
    });

    ngOnInit(): void {
        this.serviceConsultationUtilisateur.obtenirListeUsagers().subscribe({
            next: data => {
                this.listeUtilisateurs.set(data.value);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    afficherFormulaireUsager(id: string): void {
        this.router.navigate(['/modifier-utilisateur', { id: id }]);
    }

    creerUsager(): void {
        this.router.navigate(['/creer-utilisateur']);
    }

    supprimerUsager(id: string): void {
        this.serviceMajUtilisateur.supprimer(id).subscribe({
            next: data => {
                this.supprimerId(id);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

   assignerRoleUsager(id: string): void {
        this.serviceMajUtilisateur.assignerRole(id).subscribe({
            next: data => {
                alert('Succes');
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    onKey(event: any) {
        this.filtreRecherche.set(this.valeur);
    }

    supprimerId(id: string): void {
        const listeFiltree = this.listeUtilisateurs()?.filter(x => x.id !== id) ?? null;
        this.listeUtilisateurs.set(listeFiltree);
    }

}