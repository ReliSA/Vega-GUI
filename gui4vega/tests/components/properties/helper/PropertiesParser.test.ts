import { describe, it, expect } from 'vitest';
import { parseProperties } from '../../../../src/components/properties/helper/PropertiesParser';

describe('PropertiesParser', () => {
    it('should parse valid Vega properties correctly', () => {
        const spec = {
            marks: [{ type: 'rect' }],
            axes: [{ scale: 'x' }],
            legends: [{ fill: 'color' }]
        };
        const result = parseProperties(JSON.stringify(spec));
        expect(result.marks).toHaveLength(1);
        expect(result.axes).toHaveLength(1);
        expect(result.legends).toHaveLength(1);
    });

    it('should handle empty properties', () => {
        const result = parseProperties('{}');
        expect(result.marks).toEqual([]);
        expect(result.axes).toEqual([]);
        expect(result.legends).toEqual([]);
    });

    it('should handle invalid JSON gracefully', () => {
        const result = parseProperties('invalid json');
        expect(result.marks).toEqual([]);
        expect(result.axes).toEqual([]);
        expect(result.legends).toEqual([]);
    });

    it('should handle properties that are not arrays', () => {
        const spec = {
            marks: 'not an array',
            axes: {},
            legends: 123
        };
        const result = parseProperties(JSON.stringify(spec));
        expect(result.marks).toEqual([]);
        expect(result.axes).toEqual([]);
        expect(result.legends).toEqual([]);
    });
});