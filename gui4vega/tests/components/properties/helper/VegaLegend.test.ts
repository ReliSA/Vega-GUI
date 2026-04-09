import { describe, it, expect } from 'vitest';
import { updateLegendProperty } from '../../../../src/components/properties/helper/VegaLegend';

describe('VegaLegend', () => {
    it('should update a legend property correctly', () => {
        const spec = {
            legends: [{ fill: 'color', title: 'Legend Title' }]
        };
        const updatedCode = updateLegendProperty(JSON.stringify(spec), 0, 'title', 'New Title');
        const parsed = JSON.parse(updatedCode);
        expect(parsed.legends[0].title).toBe('New Title');
    });

    it('should add a new legend property correctly', () => {
        const spec = {
            legends: [{ fill: 'color' }]
        };
        const updatedCode = updateLegendProperty(JSON.stringify(spec), 0, 'orient', 'bottom');
        const parsed = JSON.parse(updatedCode);
        expect(parsed.legends[0].orient).toBe('bottom');
    });

    it('should return original code if legends array doesn\'t exist', () => {
        const spec = { marks: [] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateLegendProperty(originalCode, 0, 'title', 'New Title');
        expect(updatedCode).toBe(originalCode);
    });

    it('should return original code if legend index is invalid', () => {
        const spec = { legends: [{ fill: 'color' }] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateLegendProperty(originalCode, 1, 'title', 'New Title');
        expect(updatedCode).toBe(originalCode);
    });

    it('should handle invalid JSON gracefully', () => {
        const invalidCode = 'invalid json';
        const updatedCode = updateLegendProperty(invalidCode, 0, 'title', 'New Title');
        expect(updatedCode).toBe(invalidCode);
    });
});