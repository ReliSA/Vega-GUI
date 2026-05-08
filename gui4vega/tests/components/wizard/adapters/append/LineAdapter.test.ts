import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { LineAdapter } from "../../../../../src/components/wizard/adapters/append/LineAdapter";

describe('LineAdapter specifics', () => {
    validateWizardAdapter(
        LineAdapter,
        'append',
        ['category', 'value', 'colorLine', 'strokeWidth'],
    );
});