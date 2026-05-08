import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { AreaStackedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/AreaStackedAdapter";

describe('AreaStackedAdapter specifics', () => {
    validateWizardAdapter(
        AreaStackedAdapter,
        'template',
        ['category', 'value', 'group', 'interpolate'],
    );
});