import { describe, it, expect } from 'vitest';
import { parseDatasets } from '../../../../src/components/data/helper/VegaDataset';

describe('parseDatasets', () => {
    it('should parse a valid Vega spec and extract inline datasets', () => {
        const spec = {
            data: [
                {
                    name: 'dataset1',
                    values: [
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                    ],
                },
            ],
        };

        const result = parseDatasets(JSON.stringify(spec));
        expect(result).toEqual([
            {
                name: 'dataset1',
                values: [
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                ],
            },
        ]);
    });

    it('should ignore datasets without `values` or with empty `values` array', () => {
        const spec = {
            data: [
                {
                    name: 'dataset1',
                    values: [], // empty
                },
                {
                    name: 'dataset2',
                },
                {
                    name: 'dataset3',
                    values: [{ a: 1 }],
                },
            ],
        };

        const result = parseDatasets(JSON.stringify(spec));
        expect(result).toEqual([
            {
                name: 'dataset3',
                values: [{ a: 1 }],
            },
        ]);
    });

    it('should return an empty array if `data` is not an array', () => {
        const spec1 = { data: {} };
        const spec2 = { data: null };
        const spec3 = {};

        expect(parseDatasets(JSON.stringify(spec1))).toEqual([]);
        expect(parseDatasets(JSON.stringify(spec2))).toEqual([]);
        expect(parseDatasets(JSON.stringify(spec3))).toEqual([]);
    });

    it('should return an empty array if the code is invalid JSON', () => {
        const result = parseDatasets('invalid JSON');
        expect(result).toEqual([]);
    });

    it('should only return `name` and `values` properties, stripping out extra properties', () => {
        const spec = {
            data: [
                {
                    name: 'dataset1',
                    values: [{ x: 1 }],
                    description: 'This is a description',
                    format: { type: 'json' }
                },
            ],
        };

        const result = parseDatasets(JSON.stringify(spec));
        expect(result).toEqual([
            {
                name: 'dataset1',
                values: [{ x: 1 }],
            },
        ]);
    });
});

