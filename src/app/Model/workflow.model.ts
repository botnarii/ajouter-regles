import { Rule } from "./rule.model";

export class Workflow {

    constructor(nom: string, regles: Rule[]) {
        this.WorkflowName = nom;
        this.Rules = regles;
    }

    WorkflowName: string;
    Rules: Rule[] = [];
}