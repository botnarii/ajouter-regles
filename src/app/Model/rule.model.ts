import { Actions} from "./actions.model";

export class Rule {
    
    constructor(nom: string, messageErreur: string, operateur: string, regles: Rule[]) {
        this.RuleName = nom;
        this.ErrorMessage = messageErreur;
        this.ErrorType =  "Error";
        this.RuleExpressionType = "LambdaExpression";
        this.Operator = operateur;
        this.Rules = regles;
    }

    RuleName: string;
    ErrorMessage: string;
    ErrorType: ErrorType;
    RuleExpressionType: RuleExpressionType;
    Operator: string;
    Rules: Rule[];
}

export class SuccessEventRule extends Rule {
    
    constructor(nom: string, retour: any, messageErreur: string, operateur: string, regles: Rule[]) {
        super(nom, messageErreur, operateur, regles);
        this.SuccessEvent = retour;
    }

    SuccessEvent: any;
}

export class ActionRule extends Rule {
    
    constructor(nom: string, messageErreur: string, operateur: string, regles: Rule[], actions: string) {
        super(nom, messageErreur, operateur, regles);
        if (typeof messageErreur !== 'string') {
            this.Actions = new Actions(actions, messageErreur);
        } else {
            this.Actions = new Actions(actions, '');
        }
    }

    Actions: Actions;
}

export class SuccessEventExpressionRule extends SuccessEventRule {
    
    constructor(nom: string, retour: any, messageErreur: string, operateur: string, regles: Rule[], expre: string) {
        super(nom, retour, messageErreur, operateur, regles);
        this.Expression = expre.trim();
    }

    Expression: string;
}

export class ActionExpressionRule extends ActionRule {
    
    constructor(nom: string, messageErreur: string, operateur: string, regles: Rule[], expre: string, actions: string) {
        super(nom, messageErreur, operateur, regles, actions);
        this.Expression = expre.trim();
    }

    Expression: string;
}



type ErrorType = "Error";

type RuleExpressionType = "LambdaExpression";
