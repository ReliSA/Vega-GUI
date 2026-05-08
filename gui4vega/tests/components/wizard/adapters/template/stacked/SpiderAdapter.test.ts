import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { SpiderAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/SpiderAdapter";

describe('SpiderAdapter specifics', () => {
    validateWizardAdapter(
        SpiderAdapter,
        'template',
        ['category', 'value', 'group'],
    );
});