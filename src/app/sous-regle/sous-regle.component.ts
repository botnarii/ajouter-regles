import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-sous-regle',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, NgSelectModule],
  templateUrl: './sous-regle.component.html',
  styleUrl: './sous-regle.component.css'
})
export class SousRegleComponent {
  @Input() estPremierNiveau = false;
  @Input() form: FormGroup = this.formBuilder.group({ regles: this.formBuilder.array([]) });
  @Input() regles: FormArray = this.formBuilder.array([]);
  @Input() operateur = 1;
  @Input() listeProprietesParametres: string[] = [];

  operateursArithmetiques = ["==", ">", ">=", "<", "<=", "!=", "quelconque", "tout"];
  boutons: HTMLButtonElement[] = [];

  constructor(private formBuilder: FormBuilder) { }

  formGroupEnfant(index: number): FormGroup {
    const group = this.regles?.at(index);
    return group as FormGroup;
  }

  reglesEnfant(index: number): FormArray {
    const reglesEnfant = this.formGroupEnfant(index).controls["regles"] as FormArray;
    return reglesEnfant;
  }

  ajouterRegle(index: number, mode: number, btn: any) {
    const bouton = btn.target as HTMLButtonElement;
    // bouton.style.backgroundColor = 'blue'; btn-selectionne
    bouton.classList.add('btn-selectionne');
    bouton.disabled = true;
    this.boutons[index] = bouton;

    const regleForm = this.creerNouveauFormulaire();
    const pos = index + 1;

    if (this.estPremierNiveau && mode === 2) {
      this.ajouterRegleEnfant(index, regleForm, pos, mode);
    } else if (mode === this.operateur || this.regles.length == 1) {
      this.operateur = mode;
      this.mettreAJourOperateur();
      this.regles.insert(pos, regleForm);
    } else {
      this.ajouterRegleEnfant(index, regleForm, pos, mode);
    }
  }

  ajouterRegleEnfant(index: number, regleForm: FormGroup, pos: number, mode: number) {
    const enfants = this.reglesEnfant(index);
    const parent = this.regles.at(this.regles.length - 1) as FormGroup;
    regleForm.patchValue({
      propriete: parent.controls['propriete'].value,
      operateur: parent.controls['operateur'].value,
      valeur: parent.controls['valeur'].value
    });

    enfants.insert(pos, regleForm);

    parent.patchValue({
      propriete: '',
      operateur: '',
      valeur: '',
      operateurBooleen: mode
    });
  }

  supprimerRegle(index: number) {
    this.regles?.removeAt(index);
    if (index == this.regles.length) {
      const pos = index-1;
      this.boutons[pos].disabled = false;
      this.boutons[pos].classList.remove('btn-selectionne');
    }
  }

  insererDansTableau(element: any, tableau: any, index: number) {
    const nouveauTableau = tableau.splice(index, 0, ...element);;

    return nouveauTableau;
  }

  mettreAJourOperateur() {
    this.form.patchValue({
      operateurBooleen: this.operateur
    });
  }

  creerNouveauFormulaire(): FormGroup {
    const regleForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      retour: new FormControl(''),
      echec: new FormControl(''),
      action: new FormControl(''),
      operateurBooleen: new FormControl(this.operateur),
      propriete: new FormControl(''),
      operateur: new FormControl('=='),
      valeur: new FormControl(''),
      regles: this.formBuilder.array([])
    });

    return regleForm;
  }
}
