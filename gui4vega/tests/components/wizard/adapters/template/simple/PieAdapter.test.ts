import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { PieAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/PieAdapter";

describe('PieAdapter specifics', () => {
    validateWizardAdapter(
        PieAdapter,
        'template',
        ['category', 'value', 'sort', 'hollow', 'roundedCorners'],
    );
});