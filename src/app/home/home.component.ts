import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { CreationUsagerForm } from './Forms/creation.form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreationUsager } from './Models/creation.model';
import { Usager } from './Models/usagers.model';
import { Router } from '@angular/router';
import * as redis from "redis";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  secretToken = signal('');
  formulaireAjout: CreationUsagerForm;

  etape1 = signal(true);
  etape2 = signal(false);
  etape3 = signal(false);
  objetRecherche = signal<Usager|undefined>(undefined);

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router, private userService: UserService) { 
    this.formulaireAjout = new CreationUsagerForm();
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });
    
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
      

      const cacheConnection = redis.createClient({
        // rediss for TLS
          url: `rediss://localhost:6380`,
          password: 'abc'
      });

      // Connect to Redis
      cacheConnection.connect().then(x => {
        console.log(x);
      });
  }
  
  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  rechercherUser(): void {
    const valeurs = this.formulaireAjout.value as CreationUsager;
    const usagers = this.userService.listeUsagers();
    const usager = usagers?.find(x => x.displayName?.toLowerCase().includes(valeurs.displayName?.toLowerCase()));
    if (!usager) {
      this.router.navigate(['/liste-utilisateurs']);
    }
    this.objetRecherche.set(usager);      
  }

  getUserFromApi(): void {
    this.userService.get().subscribe({
      next: data => {
        let response = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}