import { numericDatatype } from '@hydrofoil/shaperone-core/lib/datatypes';
export function getType(datatype) {
    if (numericDatatype(datatype)) {
        return 'number';
    }
    return 'text';
}
//# sourceMappingURL=textFieldType.js.map