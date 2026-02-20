export type Tab = 'spec' | 'data';

export interface VegaDataset {
    name: string;
    values: Record<string, unknown>[];
}

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