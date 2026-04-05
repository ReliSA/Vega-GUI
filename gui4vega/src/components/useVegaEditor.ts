import { useState } from 'react';
import { prependDatasetsToSchema, prependSignalsToSchema } from "./controls/loader/helper/importData.ts";
import { isDarkMode } from "./overrideTheme.ts";
import type { ImportedData } from "./controls/loader/helper/importData.ts";
import type { GlobalToken } from "antd";

import defaultSpec from '../assets/default.json';
import defaultSpecDark from '../assets/default_dark.json';

/**
 * Props for {@link useVegaEditor}.
 */
interface useVegaEditorProps {
    /**
     * Optional imported data used to initialize the editor state.
     * If not provided, the editor will initialize with a default Vega spec.
     */
    importedData?: ImportedData;
    /**
     * The global theme token from Ant Design.
     */
    token: GlobalToken;
}

/**
 * State and setter for code of {@link VegaEditor}.
 */
export interface VegaEditorState {
    /**
     * The current Vega specification code that is being edited in the editor.
     */
    code: string;
    /**
     * Handler function to change editor code.
     * @param code - The new Vega specification code to set in the editor.
     */
    setCode: (code: string) => void;
}

/**
 * Custom hook to manage the state of the Vega visualization specification code.
 * Handles the initial merge of external datasets/signals into the schema.
 * @param props - {@link useVegaEditorProps}
 * @return An object containing the current code and a setter for the code.
 */
export const useVegaEditor = (props: useVegaEditorProps): VegaEditorState => {
    // State to hold the current Vega specification code
    const [code, setCode] = useState<string>(() => {
        // Choose default spec based on theme preference
        const defSpec = isDarkMode(props.token) ? defaultSpecDark : defaultSpec;

        // Start with the provided initial schema or fall back to the default spec
        let baseSpec = props.importedData?.schema ?? defSpec;

        // Prepend datasets and signals from the initial schema to the base spec if they exist
        if (props.importedData?.schema) {
            baseSpec = prependDatasetsToSchema(baseSpec, props.importedData?.datasets);
            baseSpec = prependSignalsToSchema(baseSpec, props.importedData?.signals);
        }

        // Serialize the final spec for the editor
        return JSON.stringify(baseSpec, null, 2);
    });

    return { code, setCode };
};