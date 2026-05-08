import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { SymbolAdapter } from "../../../../../src/components/wizard/adapters/append/SymbolAdapter";

describe('SymbolAdapter specifics', () => {
    validateWizardAdapter(
        SymbolAdapter,
        'append',
        ['category', 'value', 'symbolShape', 'symbolSize', 'colorBase', 'colorHover', 'strokeWidth', 'strokeColor'],
    );
});