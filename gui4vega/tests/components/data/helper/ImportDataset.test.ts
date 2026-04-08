import { describe, it, expect } from 'vitest';
import { isExportedDatasets } from '../../../../src/components/data/helper/ImportDataset';

describe('isExportedDatasets', () => {
    it('should return true if data matches the correct format', () => {
        const data = [
            { name: 'source_0', values: [{ a: 1 }] },
            { name: 'data_0', values: [{ b: 2 }] }
        ];
        expect(isExportedDatasets(data)).toBe(true);
    });

    it('should return false if name property is missing or not a string', () => {
        const data = [
            { name: 123, values: [{ a: 1 }] }
        ];
        expect(isExportedDatasets(data)).toBe(false);

        const missingNameData = [
            { values: [{ a: 1 }] }
        ];
        expect(isExportedDatasets(missingNameData)).toBe(false);
    });

    it('should return false if values property is empty, missing, or not an array', () => {
        const data = [
            { name: 'source', values: { a: 1 } }
        ];
        expect(isExportedDatasets(data)).toBe(false);

        const missingValuesData = [
            { name: 'source' }
        ];
        expect(isExportedDatasets(missingValuesData)).toBe(false);
    });

    it('should return false with empty array or undefined parameter', () => {
        expect(isExportedDatasets([])).toBe(false);
        expect(isExportedDatasets(undefined)).toBe(false);
    });
});