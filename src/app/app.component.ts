import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Workflow } from './Model/workflow.model';
import { SousRegleComponent } from './sous-regle/sous-regle.component';
import { PrettyJsonPipe } from './pipes/pretty.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FabriqueRegles } from './fabrique-regles/regle.fabrique';
import { Rule } from './Model/rule.model';
import { RegleDependences } from './Model/regle-dependences.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, SousRegleComponent, PrettyJsonPipe, NgSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Interface creation regles json';

  form!: FormGroup;
  rechercheParametre!: FormGroup;
  dependencesRegleForm!: FormGroup;
  nomRegle: string = '';
  operateurBooleen = 1;
  workflow: Workflow | undefined;
  dependences: RegleDependences | undefined;
  fichierJsonParametres: any;
  listeProprietesParametres: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      regles: this.formBuilder.array([])
    });

    this.form.valueChanges.subscribe(() => {
      this.genererRegle();
    });

    this.ajouterRegle();

    this.rechercheParametre = this.formBuilder.group({
      parametre: this.formBuilder.control(''),
    });

    this.dependencesRegleForm = this.formBuilder.group({
      nom: this.formBuilder.control(''),
      nomParametre: this.formBuilder.control(''),
      dependences: this.formBuilder.array([])
    });

    this.dependencesRegleForm.valueChanges.subscribe(() => {
      this.genererDependences();
    });

    this.dependencesRegle.push(this.creerNouveauFormulaireDependence());
  }

  get regles() {
    return this.form?.controls["regles"] as FormArray;
  }

  get parametre() {
    return this.rechercheParametre?.controls["parametre"].value;
  }

  get dependencesRegle() {
    return this.dependencesRegleForm?.controls["dependences"] as FormArray;
  }

  copierParametre() {
    navigator.clipboard.writeText(this.parametre);
  }

  ajouterRegle() {
    const regleForm = this.creerNouveauFormulaire();
    this.regles.push(regleForm);
  }

  ajouterRegleDependence() {
    const depend = this.creerNouveauFormulaireDependence();
    this.dependencesRegle.push(depend);
  }

  supprimerDependenceRegle(index: number) {
    this.dependencesRegle?.removeAt(index);
  }

  reinitialiserRegle() {
    this.form.reset();
    this.regles.clear();
    this.ajouterRegle();
  }

  genererRegle() {
    let formdata = this.form.value;
    const regles: any[] = this.formDataVersRules(formdata);
    const nomFloux = formdata.regles[0].nom;
    const workflow = new Workflow(nomFloux, regles);
    // this.workflow = JSON.stringify(workflow);
    this.workflow = workflow;
  }

  genererDependences() {
    let formdata = this.dependencesRegleForm.value;
    const nomFloux = formdata.nom;
    const nomParam = formdata.nomParametre;
    const tabDependences = formdata.dependences.map((depend: any) => depend.nomDependence);
    const workflow = new RegleDependences(nomFloux, nomParam, tabDependences);
    this.dependences = workflow;
  }

  reinitialiserDependences() {
    this.dependencesRegle.clear();
    this.dependencesRegleForm.reset({
      nom: '',
      nomParametre: '',
      dependences: [this.creerNouveauFormulaireDependence()]
    });
  }

  enregistrer() {
    this.genererRegle();
    this.genererDependences();
  }

  obtenirNomsProprietes(objIntrant: any, resultat: string[], base: string) {
    for (const propriete in objIntrant) {
      let nomPropriete = isNumber(propriete) ? '' : `${base}.${propriete}`;
      nomPropriete = nomPropriete.startsWith('.') ? nomPropriete.substring(1) : nomPropriete;
      const propEnfant = objIntrant[propriete];

      if (!isNumber(propriete) && !resultat.includes(nomPropriete)) {
        resultat.push(nomPropriete);
      }

      if (propEnfant instanceof Object) {
        this.obtenirNomsProprietes(propEnfant, resultat, nomPropriete);
      }
    }
  }

  formDataVersRules(formData: any): any[] {
    const rules: Rule[] = [];
    formData.regles.forEach((regle: any) => {
      const nouvelleRegle = FabriqueRegles.obtenirRegle(regle);

      if (regle.regles.length > 0) {
        nouvelleRegle.Rules = this.formDataVersRules(regle);
      }

      rules.push(nouvelleRegle);
    });

    return rules;
  }

  creerNouveauFormulaire(): FormGroup {
    const regleForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      retour: new FormControl(''),
      echec: new FormControl(''),
      action: new FormControl(''),
      operateurBooleen: new FormControl(this.operateurBooleen),
      propriete: new FormControl(''),
      operateur: new FormControl('=='),
      valeur: new FormControl(''),
      regles: this.formBuilder.array([])
    });

    return regleForm;
  }

  creerNouveauFormulaireDependence(): FormGroup {
    const dependenceForm = new FormGroup({
      nomDependence: new FormControl('', Validators.required)
    });

    return dependenceForm;
  }

  onFileChanged(event: any) {
    this.fichierJsonParametres = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.fichierJsonParametres, "UTF-8");
    fileReader.onload = () => {
      this.fichierJsonParametres = fileReader.result as string;
      const objetJson = JSON.parse(this.fichierJsonParametres);
      this.obtenirNomsProprietes(objetJson, this.listeProprietesParametres, "input1");
    }
    fileReader.onerror = (error) => {
      console.log(error);
      this.fichierJsonParametres = '';
    }
  }
}

export function isNumber(value?: string | number): boolean {
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}
