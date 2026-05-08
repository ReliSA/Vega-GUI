import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { ScatterAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/ScatterAdapter";

describe('ScatterAdapter specifics', () => {
    validateWizardAdapter(
        ScatterAdapter,
        'template',
        ['xField', 'yField', 'color', 'shape', 'size', 'stroke', 'strokeWidth'],
    );
});