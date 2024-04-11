import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GestionGroupeService } from "./Service/gestion-groupe.service";
import { Groupe } from "../Models/usagers.model";
import { GroupeComponent } from "./Groupe/groupe.component";
import { AjoutGroupeComponent } from "./Groupe/Ajout/ajout-groupe.component";


@Component({
    selector: 'app-groupes',
    templateUrl: './groupes.component.html',
    standalone: true,
    imports: [CommonModule, GroupeComponent, AjoutGroupeComponent],
    providers: [GestionGroupeService]
})
export class GroupesComponent implements OnInit {

    serviceGroupes = inject(GestionGroupeService);

    listeGroupes = signal<Groupe[] | null>([]);
    groupe = signal<string>('');
    etapeCreation = signal(false);

    ngOnInit(): void {
        this.serviceGroupes.obtenirListe().subscribe({
            next: data => {
                this.listeGroupes.set(data.value);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    afficher(id: string): void {
        this.etapeCreation.set(false);
        this.groupe.set(id);
    }

    creer(): void {
        this.etapeCreation.set(true);
        this.groupe.set('');
    }

    
    supprimer(id: string): void {
        this.serviceGroupes.supprimer(id).subscribe({
            next: data => {
                const listeFiltree = this.listeGroupes()?.filter(x => x.id !== id) ?? null;
                this.listeGroupes.set(listeFiltree);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

}