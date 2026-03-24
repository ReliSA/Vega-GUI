import { renderHook } from '@testing-library/react';
import { useVegaEditor } from '../../src/components/useVegaEditor';
import { describe, it, expect } from 'vitest';

import defaultSpec from '../../src/assets/default.json';

describe('useVegaEditor', () => {
    it('initializes with default spec when no importedData provided', () => {
        const { result } = renderHook(() => useVegaEditor({}));
        expect(JSON.parse(result.current.code)).toEqual(defaultSpec);
    });

    it('initializes with provided schema and prepends datasets/signals', () => {
        const importedData = {
            schema: {
                data: [{ name: 'existingData' }],
                signals: [{ name: 'existingSignal' }]
            },
            datasets: [{ name: 'newData', values: [{ val: 1 }, { val: 2 }, { val: 3 }] }],
            signals: [{ name: 'newSignal', value: 10 }]
        };

        const { result } = renderHook(() => useVegaEditor({ importedData }));
        const spec = JSON.parse(result.current.code);

        expect(spec.data).toEqual([
            { name: 'newData', values: [{ val: 1 }, { val: 2 }, { val: 3 }] },
            { name: 'existingData' }
        ]);
        expect(spec.signals).toEqual([
            { name: 'newSignal', value: 10 },
            { name: 'existingSignal' }
        ]);
    });

    it('ignores datasets and signals if schema is missing in importedData', () => {
        const importedData = {
            datasets: [{ name: 'ignoredData' }],
            signals: [{ name: 'ignoredSignal' }]
        } as any;

        const { result } = renderHook(() => useVegaEditor({ importedData }));
        const spec = JSON.parse(result.current.code);

        // Should match default spec since no schema is provided to merge with
        expect(spec).toEqual(defaultSpec);

        // Verify datasets/signals were NOT prepended
        const dataNames = spec.data?.map((d: any) => d.name) || [];
        const signalNames = spec.signals?.map((s: any) => s.name) || [];

        expect(dataNames).not.toContain('ignoredData');
        expect(signalNames).not.toContain('ignoredSignal');
    });

    it('uses provided schema, does not crash if datasets/signals are undefined', () => {
        const importedData = {
            schema: {
                data: [{ name: 'onlyData' }]
            }
        };

        const { result } = renderHook(() => useVegaEditor({ importedData }));
        const spec = JSON.parse(result.current.code);

        expect(spec.data).toEqual([{ name: 'onlyData' }]);
    });
});