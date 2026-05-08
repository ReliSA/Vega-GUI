import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarStackedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/BarStackedAdapter";

describe('BarStackedAdapter specifics', () => {
    validateWizardAdapter(
        BarStackedAdapter,
        'template',
        ['category', 'value', 'group'],
    );
});