import { useState, useEffect } from 'react';
import defaultSpec from '../assets/default.json';
import type { VegaDataset } from './data/helper/datasetEdit.ts';

interface useVegaEditorProps {
    initialSchema?: Record<string, unknown>;
    initialDatasets?: VegaDataset[];
    height: string;
}

export const useVegaEditor = (props: useVegaEditorProps) => {
    // Validate that the height prop is provided and is a string
    useEffect(() => {
        if (!props.height) {
            throw new Error('gui4vega - VegaEditor: prop "height" is required.');
        }
    }, [props.height]);

    // State to hold the current Vega specification code
    const [code, setCode] = useState<string>(() => {
        const baseSpec = props.initialSchema ?? defaultSpec;

        // Append initial datasets to the specification if provided
        if (props.initialDatasets && Array.isArray(props.initialDatasets) && props.initialDatasets.length > 0) {
            const specWithData = { ...baseSpec };

            if (!Array.isArray(specWithData.data)) {
                specWithData.data = [];
            }

            props.initialDatasets.forEach((dataset) => {
                const existingIndex = (specWithData.data as VegaDataset[]).findIndex(
                    (d) => d.name === dataset.name
                );

                if (existingIndex !== -1) {
                    (specWithData.data as VegaDataset[])[existingIndex] = dataset;
                } else {
                    (specWithData.data as VegaDataset[]).push(dataset);
                }
            });

            return JSON.stringify(specWithData, null, 2);
        }

        return JSON.stringify(baseSpec, null, 2);
    });

    // Handler for when a new spec is loaded from the SpecLoader component
    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return { code, setCode, handleSpecLoad };
};