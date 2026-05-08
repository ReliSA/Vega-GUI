import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { AreaAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/AreaAdapter";

describe('AreaAdapter specifics', () => {
    validateWizardAdapter(
        AreaAdapter,
        'template',
        ['category', 'value', 'color', 'interpolate'],
    );
});