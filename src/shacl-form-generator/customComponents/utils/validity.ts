import type { List } from 'cypress/types/lodash';
import { noChange } from 'lit';
import { Directive, directive, PartType } from 'lit/directive.js';

class ValidityDirective extends Directive {
    constructor(partInfo) {
        super(partInfo);
        this.isValid = true;
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('validity directive can only be used in element bindings');
        }
    }
    render(arg, property) {
        return noChange;
    }
    update(part, argsOfRender: List<any>) {
        let hasErrors = false
        hasErrors = argsOfRender
            .filter(arg => arg.hasOwnProperty('hasErrors'))
            .map(arg => {
                //console.log("arg ", arg);
                return arg.hasErrors
            })
            .reduce((a, b) => a || b, false)

        const tb = part.element;

        if (hasErrors) {
            this.isValid = false;
            tb.setAttribute('part', 'component invalid');
        } else {
            tb.setAttribute('part', 'component');
        }

        return noChange;
    }
}
export const validity = directive(ValidityDirective);
//# sourceMappingURL=validity.js.map