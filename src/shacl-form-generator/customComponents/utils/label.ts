import type { GraphPointer } from 'clownface';
import type { FormSettings } from '@hydrofoil/shaperone-core/models/forms';

export function label(choice: GraphPointer, { languages, labelProperties }: Pick<FormSettings, 'labelProperties' | 'languages'>): string {
    return choice.out(labelProperties, { language: [...languages, ''] }).values[0] || choice.value;
}