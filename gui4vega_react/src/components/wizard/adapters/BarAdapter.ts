import type { WizardAdapter, WizardField, WizardSpec } from "./WizardAdapter.ts";
import type { WizardConfig } from "../helper/wizardSpec.ts";

import barTemplate from "../templates/bar.json";

export class BarAdapter implements WizardAdapter {
    getFields(): WizardField[] {
        return [
            { name: 'xField', label: 'X Axis / Category', type: 'string', required: true, description: 'Field for X-axis' },
            { name: 'yField', label: 'Y Axis / Value', type: 'string', required: true, description: 'Field for Y-axis' }
        ];
    }

    getSpec(config: WizardConfig): WizardSpec {
        let templateString = JSON.stringify(barTemplate);
        templateString = templateString.replace(/__DATASET__/g, config.datasetName);
        templateString = templateString.replace(/__X_FIELD__/g, config.fields['xField']);
        templateString = templateString.replace(/__Y_FIELD__/g, config.fields['yField']);
        return JSON.parse(templateString);
    }
}