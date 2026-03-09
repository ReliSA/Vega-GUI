import type { VegaDataset } from "../../../data/helper/datasetEdit.ts";
import type { VegaSignal } from "../../../signal/helper/signalEdit.ts";

export interface ImportedData {
    schema: Record<string, unknown>;
    datasets?: VegaDataset[];
    signals?: VegaSignal[];
}

function prependImported<T extends { name: string }>(existing: unknown, imported: T[] | undefined): T[] {
    // Type casting array
    const oldItems: T[] = Array.isArray(existing) ? (existing as T[]) : [];
    const newItems: T[] = Array.isArray(imported) ? imported : [];

    // If there is nothing to import, return existing
    if (!Array.isArray(newItems) || newItems.length === 0) {
        return oldItems;
    }

    // Filter duplicates
    const importedNames = new Set(newItems.map(item => item.name));
    const uniqueOld = oldItems.filter(item => !importedNames.has(item.name));

    // Imported items are first
    return [...newItems, ...uniqueOld];
}

export function prependDatasetsToSchema(baseSpec: Record<string, unknown>, datasets?: VegaDataset[]): Record<string, unknown> {
    return {
        ...baseSpec,
        data: prependImported(baseSpec.data, datasets)
    };
}

export function prependSignalsToSchema(baseSpec: Record<string, unknown>, signals?: VegaSignal[]): Record<string, unknown> {
    return {
        ...baseSpec,
        signals: prependImported(baseSpec.signals, signals)
    };
}