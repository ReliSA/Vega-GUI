import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarHorizontalAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/BarHorizontalAdapter";

describe('BarHorizontalAdapter specifics', () => {
    validateWizardAdapter(
        BarHorizontalAdapter,
        'template',
        ['category', 'value', 'colorBar', 'colorHover'],
    );
});