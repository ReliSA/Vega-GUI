import type { VegaDataset } from "./VegaDataset.ts";

export function updateDatasetValue(code: string, datasetName: string, rowIndex: number, col: string, newValue: unknown): string {
    try {
        const spec = JSON.parse(code);
        const dataset = spec.data.find((d: VegaDataset) => d.name === datasetName);
        if (!dataset) return code;
        dataset.values[rowIndex][col] = newValue;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function addDatasetRow(code: string, datasetName: string, newRow: Record<string, unknown>): string {
    try {
        const spec = JSON.parse(code);
        const dataset = spec.data.find((d: VegaDataset) => d.name === datasetName);
        if (!dataset) return code;
        dataset.values.push(newRow);
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function deleteDatasetRow(code: string, datasetName: string, rowIndex: number): string {
    try {
        const spec = JSON.parse(code);
        const dataset = spec.data.find((d: VegaDataset) => d.name === datasetName);
        if (!dataset) return code;
        dataset.values.splice(rowIndex, 1);
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}