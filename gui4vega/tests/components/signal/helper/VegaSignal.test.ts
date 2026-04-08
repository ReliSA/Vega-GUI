import { describe, it, expect } from 'vitest';
import { parseSignals } from '../../../../src/components/signal/helper/VegaSignal';

describe('parseSignals', () => {
    it('should parse valid signals correctly', () => {
        const spec = {
            signals: [
                { name: 'signal1', value: 10 },
                { name: 'signal2', value: 'hello', bind: { input: 'text' } },
            ],
        };

        const result = parseSignals(JSON.stringify(spec));
        expect(result).toEqual([
            { name: 'signal1', value: 10, bind: undefined },
            { name: 'signal2', value: 'hello', bind: { input: 'text' } },
        ]);
    });

    it('should strip out extra properties from signals', () => {
        const spec = {
            signals: [
                { name: 'signal1', value: 10, description: 'Test signal', otherProp: false },
            ],
        };

        const result = parseSignals(JSON.stringify(spec));
        expect(result).toEqual([
            { name: 'signal1', value: 10, bind: undefined },
        ]);
    });

    it('should return an empty array if signals is not present', () => {
        const spec = { data: [] };
        expect(parseSignals(JSON.stringify(spec))).toEqual([]);
    });

    it('should return an empty array if signals is not an array', () => {
        const spec = { signals: { name: 'signal1' } };
        expect(parseSignals(JSON.stringify(spec))).toEqual([]);
    });

    it('should return an empty array if the code is invalid JSON', () => {
        expect(parseSignals('invalid-json')).toEqual([]);
    });

    it('should handle null elements in the signals array', () => {
        const spec = {
            signals: [
                null,
                { name: 'signal1', value: 5 },
            ],
        };

        const result = parseSignals(JSON.stringify(spec));
        expect(result).toEqual([
            { name: 'signal1', value: 5, bind: undefined },
        ]);
    });
});


