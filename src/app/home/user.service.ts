import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Signal, computed, inject, signal } from "@angular/core";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { CreationUsager } from "./Models/creation.model";
import { Groupe, ReponseHttp, Usager } from "./Models/usagers.model";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    http = inject(HttpClient);

    // ----------------- Plusieurs usagers -------------- //
    private usagers$ = this.obtenirListeUsagers();

    listeUsagers = toSignal(this.usagers$.pipe(map(x => x.value)), { initialValue: null });

    obtenirListeUsagers(): Observable<ReponseHttp<Usager[]>> {
        return this.http.get<ReponseHttp<Usager[]>>(`${environment.apiConfig.uriBase}/users`).pipe(
            catchError(() => new Observable<ReponseHttp<Usager[]>>)
        );
    }

    // ----------------- Un seul usager -------------- //
    obtenirUsager(id: string | undefined): Observable<ReponseHttp<Usager>> {
        return this.http.get<ReponseHttp<Usager>>(`${environment.apiConfig.uriBase}/users/${id}`);
    }

    // ----------------- Un seul usager -------------- //


    private groupes$ = this.http.get<ReponseHttp<Groupe[]>>(`${environment.apiConfig.uriBase}/users`).pipe(
        catchError(() => new Observable<ReponseHttp<Groupe[]>>)
    );
    // listeGroupes = toSignal(this.groupes$.pipe(map(x => x.value)), {initialValue: null});

    public obtenirListe(): Observable<ReponseHttp<Usager[]>> {
        return this.http.get<ReponseHttp<Usager[]>>(`${environment.apiConfig.uriBase}/users`);
    }

    public get(): Observable<any> {
        return this.http.get(`${environment.apiConfig.uriApiUsers}/WeatherForecast`);
    }

    public obtenirRole(idUsager: string): Observable<any> {
        return this.http.get(`${environment.apiConfig.uriBase}/users/${idUsager}/appRoleAssignments?$count=true`);
    }
}