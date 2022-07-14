import { Directive, PartType, directive } from 'lit/directive.js';
import { noChange } from 'lit';

class ReadonlyDirective extends Directive {
    constructor(partInfo) {
        super(partInfo);
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('validity directive can only be used in element bindings');
        }
    }
    render(arg) {
        return noChange;
    }
    update(part, [{ shape }]) {
        if (shape.readOnly) {
            part.element.setAttribute('readonly', 'readonly');
            part.element.setAttribute('disabled', 'disabled');
        }
        else {
            part.element.removeAttribute('readonly');
            part.element.removeAttribute('disabled');
        }
    }
}
export const readOnly = directive(ReadonlyDirective);
//# sourceMappingURL=readonly.js.map