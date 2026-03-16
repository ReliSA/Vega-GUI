import type { WizardConfig } from "../helper/wizardSpec.ts";

export interface WizardField {
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean';
    required?: boolean;
    description?: string;
}

export interface WizardSpec {
    $schema: string;
    description: string;
    width: number;
    height: number;
    padding: number;
    autosize?: string;
    data: Record<string, unknown>[];
    signals: Record<string, unknown>[];
    scales?: Record<string, unknown>[];
    axes?: Record<string, unknown>[];
    marks?: Record<string, unknown>[];
    legends?: Record<string, unknown>[];
    [key: string]: unknown;
}

export interface WizardAdapter {
    getFields(): WizardField[];
    getSpec(config: WizardConfig): WizardSpec;
}