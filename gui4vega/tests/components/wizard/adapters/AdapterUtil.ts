import { describe, it, expect } from 'vitest';
import type { WizardAdapter } from "../../../../src/components/wizard/adapters/WizardAdapter";

/**
 * Shared tests for all WizardAdapters
 */
export function validateWizardAdapter(AdapterClass: new () => WizardAdapter, expectedMode: string, expectedFieldNames: string[]) {
    const adapter = new AdapterClass();

    describe('WizardAdapter generic tests', () => {
        it('should have the correct mode', () => {
            expect(adapter.mode).toBe(expectedMode);
        });

        it('should return the expected field names', () => {
            const fields = adapter.getFields();
            const names = fields.map(f => f.name);
            expect(names).toEqual(expect.arrayContaining(expectedFieldNames));
        });

        it('should mark required fields correctly', () => {
            const fields = adapter.getFields();
            fields.forEach(field => {
                if (['category', 'value', 'group'].includes(field.name)) {
                    expect(field.required).toBe(true);
                }
            });
        });
    });
}