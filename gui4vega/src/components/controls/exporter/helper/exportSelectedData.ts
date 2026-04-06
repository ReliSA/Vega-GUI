/**
 * Exported Vega content with separated specification, datasets, and signals.
 * Datasets and signals that are present in the attributes are not included in the specification.
 */
export interface ExportedData {
    /**
     * The Vega specification as a JSON string, with the selected datasets and signals removed.
     */
    spec: string;
    /**
     * An array of JSON strings representing the selected datasets that were extracted from the specification.
     * Each string contains the dataset name and its values.
     */
    datasets: string[];
    /**
     * An array of JSON strings representing the selected signals that were extracted from the specification.
     * Each string contains the signal name and its value.
     */
    signals: string[];
}

/**
 * Function to export selected datasets and signals from a Vega specification.
 * @param specString - The Vega specification as a JSON string from which to extract the selected datasets and signals.
 * @param datasetNames - An array of dataset names to be exported.
 * @param signalNames - An array of signal names to be exported.
 * @return An object containing the modified Vega specification with the selected datasets and signals extracted, and arrays of the exported datasets and signals as JSON strings.
 */
export function exportSelectedData(specString: string, datasetNames: string[] = [], signalNames: string[] = []): ExportedData {
    let specObj: Record<string, unknown>;

    // Parse Vega specification
    try {
        specObj = JSON.parse(specString);
    } catch {
        throw new Error('Invalid JSON specification');
    }

    let exportedDatasets: string[] = [];
    let exportedSignals: string[] = [];

    // Extract selected datasets before removing them from spec
    if (Array.isArray(specObj.data) && datasetNames.length > 0) {
        exportedDatasets = specObj.data
            .filter((d: Record<string, unknown>) => d && d.name && datasetNames.includes(d.name as string))
            .map((d: Record<string, unknown>) => JSON.stringify({ name: d.name, values: d.values }));

        // Remove selected datasets from spec
        specObj.data = specObj.data.filter((d: Record<string, unknown>) =>
            !d || !d.name || !datasetNames.includes(d.name as string)
        );
    }

    // Extract selected signals before removing them from spec
    if (Array.isArray(specObj.signals) && signalNames.length > 0) {
        exportedSignals = specObj.signals
            .filter((s: Record<string, unknown>) => s && s.name && signalNames.includes(s.name as string))
            .map((s: Record<string, unknown>) => JSON.stringify({ name: s.name, value: s.value }));

        // Remove selected signals from spec
        specObj.signals = specObj.signals.filter((s: Record<string, unknown>) =>
            !s || !s.name || !signalNames.includes(s.name as string)
        );
    }

    return {
        spec: JSON.stringify(specObj, null, 2),
        datasets: exportedDatasets,
        signals: exportedSignals
    };
}