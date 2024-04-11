import { SuccessEventRule, ActionRule, ActionExpressionRule, SuccessEventExpressionRule } from "../Model/rule.model";
import { isNumber } from "../app.component";

export class FabriqueRegles {

    static obtenirRegle(regle: any): ActionRule | ActionExpressionRule | SuccessEventRule | SuccessEventExpressionRule {
        if ((regle.action && regle.regles.length > 0) || isNumber(regle.echec)) {
            return new ActionRule(regle.nom, regle.echec, this.obtenirOperateur(regle.operateurBooleen), [], regle.action);
        }

        if ((regle.action && regle.regles.length === 0) || isNumber(regle.echec)) {
            return new ActionExpressionRule(regle.nom, regle.echec, this.obtenirOperateur(regle.operateurBooleen), [], this.traduireExpression(regle.propriete, regle.operateur, regle.valeur), regle.action);
        }

        if (regle.action?.length === 0 && regle.regles.length > 0) {
            return new SuccessEventRule(regle.nom, regle.retour, regle.echec, this.obtenirOperateur(regle.operateurBooleen), []);
        }

        return new SuccessEventExpressionRule(regle.nom, regle.retour, regle.echec, this.obtenirOperateur(regle.operateurBooleen), [], this.traduireExpression(regle.propriete, regle.operateur, regle.valeur));
    }

    static obtenirOperateur(valeur: number) {
        return valeur === 1 ? "OrElse" : 'AndAlso';
    }

    static traduireExpression(propriete: string, operateur: string, valeur: string): string {
        if (['quelconque', 'tout'].includes(operateur)) {
            const oper = this.traduireOperateurArithmetique(operateur);
            const val = this.traduireValeur(valeur);
            return `${propriete}.${oper}(${val})`;
        }

        if (!propriete) {
            return '';
        }

        return [propriete, operateur, valeur].join(" ");
    }

    static traduireOperateurArithmetique(operateur: string) {
        return operateur?.replaceAll('quelconque', 'Any').replaceAll('tout', 'All');
    }

    static traduireValeur(valeur: string): string {
        return valeur?.replaceAll(' et ', ' And ').replaceAll(' ou ', ' Or ');
    }
}