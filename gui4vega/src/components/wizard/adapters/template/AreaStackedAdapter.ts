import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a stacked area chart Vega specification based on user input from the wizard form.
 */
export class AreaStackedAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xField', type: 'field', label: 'X Axis / Category', required: true },
            { name: 'yField', type: 'field', label: 'Y Axis / Value', required: true },
            { name: 'colorGroup', type: 'field', label: 'Color / Group', required: true },
            { name: 'interpolate', type: 'select', label: 'Interpolation', required: false, options: ['linear', 'step', 'step-before', 'step-after', 'basis', 'cardinal', 'monotone'], defaultValue: 'linear' },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['xField'];
        const yField = fields['yField'];
        const colorGroup = fields['colorGroup'];
        const interpolate = fields['interpolate'];

        const suffix = Math.floor(Math.random() * 10000);
        const transformedDataName = `stacked_area_data_${suffix}`;

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "data": [
                {
                    "name": transformedDataName,
                    "source": datasetName,
                    "transform": [
                        {
                            "type": "stack",
                            "groupby": [xField],
                            "sort": {"field": colorGroup},
                            "field": yField
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": transformedDataName, "field": xField}
                },
                {
                    "name": "y",
                    "type": "linear",
                    "range": "height",
                    "nice": true,
                    "zero": true,
                    "domain": {"data": transformedDataName, "field": "y1"}
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": "category",
                    "domain": {"data": transformedDataName, "field": colorGroup}
                }
            ],

            "axes": [
                {"orient": "bottom", "scale": "x", "zindex": 1},
                {"orient": "left", "scale": "y", "zindex": 1}
            ],

            "marks": [
                {
                    "type": "group",
                    "from": {
                        "facet": {
                            "name": "facet_data",
                            "data": transformedDataName,
                            "groupby": colorGroup
                        }
                    },
                    "marks": [
                        {
                            "type": "area",
                            "from": {"data": "facet_data"},
                            "encode": {
                                "enter": {
                                    "interpolate": {"value": interpolate},
                                    "x": {"scale": "x", "field": xField},
                                    "y": {"scale": "y", "field": "y0"},
                                    "y2": {"scale": "y", "field": "y1"},
                                    "fill": {"scale": "color", "field": colorGroup}
                                },
                                "update": {
                                    "fillOpacity": {"value": 1}
                                },
                                "hover": {
                                    "fillOpacity": {"value": 0.5}
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }
}