import { describe, it, expect } from 'vitest';
import { updateMarkProperty } from '../../../../src/components/properties/helper/VegaMark';

describe('VegaMark', () => {
    it('should update an existing mark encode property correctly', () => {
        const spec = {
            marks: [
                {
                    type: 'rect',
                    encode: {
                        update: {
                            fill: { value: 'red' }
                        }
                    }
                }
            ]
        };
        const updatedCode = updateMarkProperty(JSON.stringify(spec), 0, 'update', 'fill', 'value', 'blue');
        const parsed = JSON.parse(updatedCode);
        expect(parsed.marks[0].encode.update.fill.value).toBe('blue');
    });

    it('should create missing encode set and property correctly', () => {
        const spec = {
            marks: [
                { type: 'rect' }
            ]
        };
        const updatedCode = updateMarkProperty(JSON.stringify(spec), 0, 'enter', 'x', 'value', 10);
        const parsed = JSON.parse(updatedCode);
        expect(parsed.marks[0].encode.enter.x.value).toBe(10);
    });

    it('should create missing property in existing encode set correctly', () => {
        const spec = {
            marks: [
                {
                    type: 'rect',
                    encode: {
                        update: {
                            y: { value: 5 }
                        }
                    }
                }
            ]
        };
        const updatedCode = updateMarkProperty(JSON.stringify(spec), 0, 'update', 'x', 'value', 10);
        const parsed = JSON.parse(updatedCode);
        expect(parsed.marks[0].encode.update.y.value).toBe(5);
        expect(parsed.marks[0].encode.update.x.value).toBe(10);
    });

    it('should return original code if marks array doesn\'t exist', () => {
        const spec = { axes: [] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateMarkProperty(originalCode, 0, 'update', 'fill', 'value', 'blue');
        expect(updatedCode).toBe(originalCode);
    });

    it('should return original code if mark index is invalid', () => {
        const spec = { marks: [{ type: 'rect' }] };
        const originalCode = JSON.stringify(spec);
        const updatedCode = updateMarkProperty(originalCode, 1, 'update', 'fill', 'value', 'blue');
        expect(updatedCode).toBe(originalCode);
    });

    it('should handle invalid JSON gracefully', () => {
        const invalidCode = 'invalid json';
        const updatedCode = updateMarkProperty(invalidCode, 0, 'update', 'fill', 'value', 'blue');
        expect(updatedCode).toBe(invalidCode);
    });
});