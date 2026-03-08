import { describe, it, expect } from 'vitest';
import { exportSelectedData } from '../../../../../src/components/controls/exporter/helper/exportSelectedData';

import defaultSpecification from '../../../../assets/default.json';
import minimalSpecification from '../../../../assets/minimal.json';

interface TestCase {
    title: string;
    args: [string, string[]?, string[]?];
}

describe('exportSelectedData', () => {
    const defaultSpec = JSON.stringify(defaultSpecification, null, 2);
    const minimalSpec = JSON.stringify(minimalSpecification, null, 2);

    describe('with valid specification', () => {
        it.each<TestCase>([
            {
                title: 'should export empty arrays when calling without dataset and signal names',
                args: [defaultSpec],
            },
            {
                title: 'should export empty arrays when no datasets or signals are selected',
                args: [defaultSpec, [], []],
            },
            {
                title: 'should handle non-existent dataset names gracefully',
                args: [defaultSpec, ['does_not_exist'], []],
            },
            {
                title: 'should handle non-existent signal names gracefully',
                args: [defaultSpec, [], ['does_not_exist']],
            },
        ])('$title', (testCase) => {
            const result = exportSelectedData(...testCase.args);

            expect(result.spec).toEqual(defaultSpec);
            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.$schema).toBe('https://vega.github.io/schema/vega/v6.json');
            expect(parsedSpec.data).toHaveLength(4);
            expect(parsedSpec.signals).toHaveLength(6);
            expect(parsedSpec.width).toBe(500);
            expect(parsedSpec.height).toBe(300);
            expect(parsedSpec.marks).toBeDefined();
        });

        it('should export selected dataset and remove it from spec', () => {
            const result = exportSelectedData(defaultSpec, ['testDataset1'], []);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toHaveLength(1);
            const resultDataset = JSON.parse(result.datasets[0]);
            expect(resultDataset.name).toBe('testDataset1');
            expect(resultDataset.values).toHaveLength(2);

            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(3);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeUndefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeDefined();
            expect(parsedSpec.signals).toHaveLength(6);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeDefined();
        });

        it('should export multiple selected datasets in correct order', () => {
            // Order of the parameters DOES NOT MATTER
            // What matters is the order of the dataset names in Vega specification
            const result = exportSelectedData(defaultSpec, ['testDataset2', 'testDataset1'], []);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toHaveLength(2);
            const resultDataset1 = JSON.parse(result.datasets[0]);
            expect(resultDataset1.name).toBe('testDataset1');
            expect(resultDataset1.values).toHaveLength(2);
            const resultDataset2 = JSON.parse(result.datasets[1]);
            expect(resultDataset2.name).toBe('testDataset2');
            expect(resultDataset2.values).toHaveLength(3);

            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(2);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeUndefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeUndefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeDefined();
            expect(parsedSpec.signals).toHaveLength(6);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeDefined();
        });

        it('should export selected signal and remove it from spec', () => {
            const result = exportSelectedData(defaultSpec, [], ['testSignal1']);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toEqual([]);

            expect(result.signals).toHaveLength(1);
            expect(result.signals[0]).toBe(JSON.stringify({ name: 'testSignal1', value: 1 }));

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(4);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeDefined();
            expect(parsedSpec.signals).toHaveLength(5);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeUndefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeDefined();
        });

        it('should export multiple selected signals in correct order', () => {
            // Order of the parameters DOES NOT MATTER
            // What matters is the order of the signal names in Vega specification
            const result = exportSelectedData(defaultSpec, [], ['testSignal2', 'testSignal1']);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toEqual([]);

            expect(result.signals).toHaveLength(2);
            expect(result.signals[0]).toBe(JSON.stringify({ name: 'testSignal1', value: 1 }));
            expect(result.signals[1]).toBe(JSON.stringify({ name: 'testSignal2', value: 2 }));

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(4);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeDefined();
            expect(parsedSpec.signals).toHaveLength(4);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeUndefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeUndefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeDefined();
        });

        it('should export both datasets and signals', () => {
            const result = exportSelectedData(defaultSpec, ['testDataset3'], ['testSignal3']);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toHaveLength(1);
            const resultDataset = JSON.parse(result.datasets[0]);
            expect(resultDataset.name).toBe('testDataset3');
            expect(resultDataset.values).toHaveLength(4);

            expect(result.signals).toHaveLength(1);
            expect(result.signals[0]).toBe(JSON.stringify({ name: 'testSignal3', value: 3 }));

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(3);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeUndefined();
            expect(parsedSpec.signals).toHaveLength(5);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeUndefined();
        });

        it('should export multiple datasets and signals in correct order', () => {
            const result = exportSelectedData(defaultSpec, ['testDataset3', 'testDataset1'], ['testSignal3', 'testSignal1']);

            expect(result.spec).not.toEqual(defaultSpec);

            expect(result.datasets).toHaveLength(2);
            const resultDataset1 = JSON.parse(result.datasets[0]);
            expect(resultDataset1.name).toBe('testDataset1');
            expect(resultDataset1.values).toHaveLength(2);
            const resultDataset2 = JSON.parse(result.datasets[1]);
            expect(resultDataset2.name).toBe('testDataset3');
            expect(resultDataset2.values).toHaveLength(4);

            expect(result.signals).toHaveLength(2);
            expect(result.signals[0]).toBe(JSON.stringify({ name: 'testSignal1', value: 1 }));
            expect(result.signals[1]).toBe(JSON.stringify({ name: 'testSignal3', value: 3 }));

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(2);
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset1')).toBeUndefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset2')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'testDataset3')).toBeUndefined();
            expect(parsedSpec.signals).toHaveLength(4);
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal1')).toBeUndefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'testSignal3')).toBeUndefined();
        });
    });

    describe('with minimal spec', () => {
        it.each<TestCase>([
            {
                title: 'should handle spec without data array',
                args: [minimalSpec, ['testDataset1'], []],
            },
            {
                title: 'should handle spec without signal array',
                args: [minimalSpec, [], ['testSignal1']],
            },
        ])('$title', (testCase) => {
            const result = exportSelectedData(...testCase.args);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toBeUndefined();
        });
    });

    describe('with invalid JSON', () => {
        it('should throw error for invalid JSON', () => {
            expect(() => {
                exportSelectedData('not a valid JSON {', [], []);
            }).toThrow('Invalid JSON specification');
        });

        it('should throw error for empty string', () => {
            expect(() => {
                exportSelectedData('', [], []);
            }).toThrow('Invalid JSON specification');
        });
    });
});