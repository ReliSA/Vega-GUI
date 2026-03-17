import type { WizardAdapter, WizardField, WizardSpec } from "./WizardAdapter.ts";
import type { WizardConfig } from "../helper/wizardSpec.ts";

import pieTemplate from "../templates/pie.json";

export class PieAdapter implements WizardAdapter {
    getFields(): WizardField[] {
        return [
            { name: 'category', label: 'Category Field', type: 'string', required: true, description: 'Field for color' },
            { name: 'value', label: 'Value Field', type: 'string', required: true, description: 'Field to determine size/angle' }
        ];
    }

    getSpec(config: WizardConfig): WizardSpec {
        let templateString = JSON.stringify(pieTemplate);

        templateString = templateString.replace(/__DATASET__/g, config.datasetName);
        templateString = templateString.replace(/__ID_FIELD__/g, config.fields['value']);
        templateString = templateString.replace(/__VALUE_FIELD__/g, config.fields['category']);

        return JSON.parse(templateString);
    }
}