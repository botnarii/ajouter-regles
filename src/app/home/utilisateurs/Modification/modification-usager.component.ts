import { Component, OnInit, Signal, computed, effect, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CreationUsagerForm, ModificationUsagerForm } from "../../Forms/creation.form";
import { ActivatedRoute, Router } from "@angular/router";
import { ReponseHttp, Role, Usager } from "../../Models/usagers.model";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ModificationUsagerService } from "./Service/modification-usager.service";
import { CreationUsager } from "../../Models/creation.model";
import { UserService } from "../../user.service";


@Component({
    selector: 'app-modifier-utilisateur',
    templateUrl: './modification-usager.component.html',
    styleUrl: './modification-usager.component.css',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    providers: [ModificationUsagerService]
})
export class ModifierUtilisateurComponent implements OnInit {

    router = inject(Router);
    route = inject(ActivatedRoute);
    userService = inject(ModificationUsagerService);
    http = inject(HttpClient);

    formulaireModification: ModificationUsagerForm | null = null;

    etapeModification = signal(true);
    etapeRole = signal(false);
    listeRoles = signal<Role[]>([]);

    ngOnInit(): void {
        this.userService.obtenirUsager(this.route.snapshot.paramMap.get('id') ?? undefined).subscribe({
            next: data => {
                this.formulaireModification = new ModificationUsagerForm(data);
            },
            error: error => {
                alert('Echec');
            }
        });

        this.obtenirRoles();
    }

    modifierUsager(): void {
        const valeurs = this.formulaireModification?.value as ModificationUsagerModel;
        this.userService.modifier(this.route.snapshot.paramMap.get('id') ?? undefined, valeurs).subscribe({
            next: data => {
                alert('Succes');
            },
            error: error => {
                alert('Echec');
            }
        });
    }

    supprimerRoleUsager(idRole: string): void {
        const idUsager = this.route.snapshot.paramMap.get('id') ?? null;
        this.userService.supprimerRole(idUsager, idRole).subscribe({
            next: data => {
                const listeFiltree = this.listeRoles()?.filter(x => x.id !== idRole) ?? null;
                this.listeRoles.set(listeFiltree);
            },
            error: error => {
                alert("Echec");
            }
        });
    }

    obtenirRoles(): void {
        const idUsager = this.route.snapshot.paramMap.get('id') ?? null;
        this.userService.obtenirRoles(idUsager).subscribe({
            next: data => {
                this.listeRoles.set(data.value);
            },
            error: error => {
                alert('Echec');
            }
        });
    }

    allerALEtapeRole(): void {
        this.etapeRole.set(true);
        this.etapeModification.set(false);
    }

    allerALEtapeModification(): void {
        this.etapeRole.set(false);
        this.etapeModification.set(true);
    }
}

export interface ModificationUsagerModel {
    displayName: string;
}