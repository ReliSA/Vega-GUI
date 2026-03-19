import type { VegaDataset } from "./VegaDataset.ts";

export function parseDatasets(code: string): VegaDataset[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return [];
        return spec.data
            .filter((d: VegaDataset) => Array.isArray(d.values) && d.values.length > 0)
            .map((d: VegaDataset) => ({ name: d.name, values: d.values }));
    } catch {
        return [];
    }
}

export function addDataset(
    code: string,
    datasetName: string,
    initialValues: Record<string, unknown>[] = []
): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) spec.data = [];
        // Ensure unique name
        if (spec.data.some((d: VegaDataset) => d.name === datasetName)) return code;
        spec.data.push({ name: datasetName, values: initialValues });
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function deleteDataset(
    code: string,
    datasetName: string
): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return code;
        spec.data = spec.data.filter((d: VegaDataset) => d.name !== datasetName);
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}