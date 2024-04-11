export class RegleDependences {
   
    constructor(nomRegle: string, nomParam: string, tabDependences: string[]) {
       this.Nom = nomRegle;
       this.NomParametre = nomParam;
       this.Dependences = tabDependences;
    }

    Nom: string;
    NomParametre: string;
    Dependences: string[]
}