import { describe, it, expect } from 'vitest';
import { RectAdapter } from "../../../../../src/components/wizard/adapters/append/RectAdapter";

describe('RectAdapter', () => {
    const adapter = new RectAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('append');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(4);
        });
    });
});