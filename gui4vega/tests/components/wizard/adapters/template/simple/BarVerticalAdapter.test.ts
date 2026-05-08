import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarVerticalAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/BarVerticalAdapter";

describe('BarVerticalAdapter specifics', () => {
    validateWizardAdapter(
        BarVerticalAdapter,
        'template',
        ['category', 'value', 'colorBar', 'colorHover'],
    );
});