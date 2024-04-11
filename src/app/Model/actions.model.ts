export class Actions {
   
    constructor(actionOnSuccess: string, actionOnFailure: string) {
        this.OnSuccess = new OnSuccess(actionOnSuccess);        
        this.OnFailure = new OnFailure(actionOnFailure);        
    }

    OnSuccess: OnSuccess;
    OnFailure: OnFailure;
}

export class OnSuccess {
    constructor(action: string) {
        this.Name = "OutputExpression";
        this.Context = new ActionContext(action);        
    }
    Name: string;
    Context: ActionContext
}

export class OnFailure {
    constructor(action: string) {
        this.Name = "OutputExpression";
        this.Context = new ActionContext(action);        
    }
    Name: string;
    Context: ActionContext
}

export class ActionContext {
    constructor(action: string) {
        this.Expression = action;        
    }

    Expression: string
}