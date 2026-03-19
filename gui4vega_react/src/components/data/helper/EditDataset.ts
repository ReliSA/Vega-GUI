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

export function addDataset(code: string, datasetName: string, initialValues: Record<string, unknown>[] = []): string {
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

export function deleteDataset(code: string, datasetName: string): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return code;
        spec.data = spec.data.filter((d: VegaDataset) => d.name !== datasetName);
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function moveDataset(code: string, datasetName: string, direction: 'up' | 'down'): string {
    try {
        const spec = JSON.parse(code);
        const datasets = spec?.data;

        // No datasets found, nothing to move
        if (!Array.isArray(datasets)) return code;

        // Find the valid index of the dataset to move
        const currentIndex = datasets.findIndex((d: VegaDataset) => d.name === datasetName);
        if (currentIndex === -1) return code;

        // Helper to check if a dataset is visible (has non-empty values)
        const isVisible = (d: VegaDataset) => Array.isArray(d.values) && d.values.length > 0;

        // Determine step direction
        const isUp = direction === 'up';
        const step = isUp ? -1 : 1;

        // Make target start or end of the list
        let targetIndex = isUp ? 0 : datasets.length - 1;

        // Count how many datasets are above/below the current one
        for (let i = currentIndex + step; i >= 0 && i < datasets.length; i += step) {
            if (isVisible(datasets[i])) {
                targetIndex = i;
                break;
            }
        }

        // Swap datasets
        const [movedItem] = datasets.splice(currentIndex, 1);
        datasets.splice(targetIndex, 0, movedItem);

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}