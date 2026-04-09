import { describe, it, expect } from 'vitest';
import { updateAxisProperty } from '../../../../src/components/properties/helper/VegaAxis';

describe('VegaAxis', () => {
    it('should update an axis property correctly', () => {
        const spec = {
            axes: [{ scale: 'x', title: 'X Axis' }]
        };
        const updatedCode = updateAxisProperty(JSON.stringify(spec), 0, 'title', 'New Title');
        const parsed = JSON.parse(updatedCode);
        expect(parsed.axes[0].title).toBe('New Title');
    });

    it('should add a new axis property correctly', () => {
        const spec = {
            axes: [{ scale: 'x' }]
        };
        const updatedCode = updateAxisProperty(JSON.stringify(spec), 0, 'orient', 'bottom');
        const parsed = JSON.parse(updatedCode);
        expect(parsed.axes[0].orient).toBe('bottom');
    });

    it('should return original code if axes array doesn\'t exist', () => {
        const spec = { marks: [] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateAxisProperty(originalCode, 0, 'title', 'New Title');
        expect(updatedCode).toBe(originalCode);
    });

    it('should return original code if axis index is invalid', () => {
        const spec = { axes: [{ scale: 'x' }] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateAxisProperty(originalCode, 1, 'title', 'New Title');
        expect(updatedCode).toBe(originalCode);
    });

    it('should handle invalid JSON gracefully', () => {
        const invalidCode = 'invalid json';
        const updatedCode = updateAxisProperty(invalidCode, 0, 'title', 'New Title');
        expect(updatedCode).toBe(invalidCode);
    });
});