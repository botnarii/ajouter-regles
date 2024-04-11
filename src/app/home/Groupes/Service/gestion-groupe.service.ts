import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { CreationGroupe, MembreGroupe, ModificationGroupe } from "../../Models/creation.model";
import { Groupe, ReponseHttp } from "../../Models/usagers.model";

@Injectable()
export class GestionGroupeService {
    http = inject(HttpClient);

    obtenir(id: string | undefined): Observable<Groupe> {
        return this.http.get<Groupe>(`${environment.apiConfig.uriBase}/groups/${id}`);
    }

    obtenirListe(): Observable<ReponseHttp<Groupe[]>> {
        return this.http.get<ReponseHttp<Groupe[]>>(`${environment.apiConfig.uriBase}/groups`);
    }
    
    public creer(input: CreationGroupe): Observable<any> {
        return this.http.post(`${environment.apiConfig.uriBase}/groups`, input);
    }

    public inviter(idGroupe: string, idUsager: string): Observable<any> {
        return this.http.post(`${environment.apiConfig.uriBase}/groups/${idGroupe}/members/$ref`, {
            "@odata.id": `https://graph.microsoft.com/v1.0/users/${idUsager}`
        });
    }

    public desinviter(idGroupe: string, idUsager: string): Observable<any> {
        return this.http.delete(`${environment.apiConfig.uriBase}/groups/${idGroupe}/members/${idUsager}/$ref`);
    }

    public modifier(id: string | undefined, input: ModificationGroupe): Observable<any> {
        return this.http.patch(`${environment.apiConfig.uriBase}/groups/${id}`, input);
    }

    public supprimer(id: string): Observable<any> {
        return this.http.delete(`${environment.apiConfig.uriBase}/groups/${id}`);
    }

    public obtenirListeMembres(idGroupe: string): Observable<ReponseHttp<MembreGroupe[]>> {
        return this.http.get<ReponseHttp<MembreGroupe[]>>(`${environment.apiConfig.uriBase}/groups/${idGroupe}/members`);
    }

    public assignerRole(idGroupe: string): Observable<any> {
        const idApp = 'd90a858c-c6fd-43c0-9b7d-eff683db1a09';
        const idRole = '00000000-0000-0000-0000-000000000000';
        return this.http.post(`${environment.apiConfig.uriBase}/groups/${idGroupe}/appRoleAssignments`, {
            "principalId": idGroupe,
            "resourceId": idApp,
            "appRoleId": idRole
        });
    }

    public supprimerRole(idGroupe: string|null, idRole: string): Observable<any> {
        return this.http.delete(`${environment.apiConfig.uriBase}/groups/${idGroupe}/appRoleAssignments/${idRole}`);
    }
}