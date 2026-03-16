import type { WizardAdapter } from "../adapters/WizardAdapter.ts";
import { BarAdapter } from "../adapters/BarAdapter.ts";
import { PieAdapter } from "../adapters/PieAdapter.ts";

export type ChartType = 'bar' | 'pie';

export interface WizardConfig {
    chartType: ChartType;
    datasetName: string;
    fields: Record<string, string>;
}

export const adapters: Record<ChartType, WizardAdapter> = {
    bar: new BarAdapter(),
    pie: new PieAdapter()
};

export function generateSpec(currentCode: string, config: WizardConfig): string {
    try {
        const currentSpec = JSON.parse(currentCode);
        const { chartType } = config;

        const adapter = adapters[chartType];
        if (!adapter) {
            return currentCode;
        }

        const newSpec = adapter.getSpec(config);

         // Prepend data
        if (currentSpec.data) {
             newSpec.data = [...currentSpec.data, ...newSpec.data];
        }

        // Prepend signals
        if (currentSpec.signals) {
            newSpec.signals = [...currentSpec.signals, ...newSpec.signals];
        }

        return JSON.stringify(newSpec, null, 2);

    } catch (e) {
        console.error("Error generating spec", e);
        return currentCode;
    }
}