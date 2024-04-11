import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Signal, computed, inject, signal } from "@angular/core";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CreationUsager } from "../../../Models/creation.model";
import { ReponseHttp, Role, Usager } from "../../../Models/usagers.model";
import { ModificationUsagerModel } from "../modification-usager.component";

@Injectable()
export class ModificationUsagerService {
    http = inject(HttpClient);

    obtenirUsager(id: string | undefined): Observable<Usager> {
        return this.http.get<Usager>(`${environment.apiConfig.uriBase}/users/${id}`);
    }
    
    public create(input: CreationUsager): Observable<any> {
        return this.http.post(`${environment.apiConfig.uriBase}/users`, input);
    }

    public invite(input: string): Observable<any> {
        return this.http.post(`${environment.apiConfig.uriBase}/invitations`, {
            "invitedUserEmailAddress": input,
            "inviteRedirectUrl": "https://localhost:4200/"
        });
    }

    public modifier(id: string | undefined, input: ModificationUsagerModel): Observable<any> {
        return this.http.patch(`${environment.apiConfig.uriBase}/users/${id}`, input);
    }

    public supprimer(id: string): Observable<any> {
        return this.http.delete(`${environment.apiConfig.uriBase}/users/${id}`);
    }

    public assignerRole(idUsager: string): Observable<any> {
        const idApp = 'd90a858c-c6fd-43c0-9b7d-eff683db1a09';
        const idRole = '00000000-0000-0000-0000-000000000000';
        return this.http.post(`${environment.apiConfig.uriBase}/users/${idUsager}/appRoleAssignments`, {
            "principalId": idUsager,
            "resourceId": idApp,
            "appRoleId": idRole
        });
    }

    public supprimerRole(idUsager: string|null, idRole: string): Observable<any> {
        return this.http.delete(`${environment.apiConfig.uriBase}/users/${idUsager}/appRoleAssignments/${idRole}`);
    }

    
    public obtenirRoles(idUsager: string|null): Observable<ReponseHttp<Role[]>> {
        return this.http.get<ReponseHttp<Role[]>>(`${environment.apiConfig.uriBase}/users/${idUsager}/appRoleAssignments?$count=true`);
    }

}