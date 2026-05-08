import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { RectAdapter } from "../../../../../src/components/wizard/adapters/append/RectAdapter";

describe('RectAdapter specifics', () => {
    validateWizardAdapter(
        RectAdapter,
        'append',
        ['category', 'value', 'colorBar', 'colorHover'],
    );
});