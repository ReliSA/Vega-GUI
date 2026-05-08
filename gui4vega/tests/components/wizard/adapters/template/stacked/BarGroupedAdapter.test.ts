import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarGroupedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/BarGroupedAdapter";

describe('BarGroupedAdapter specifics', () => {
    validateWizardAdapter(
        BarGroupedAdapter,
        'template',
        ['category', 'value', 'group'],
    );
});