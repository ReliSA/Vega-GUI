import type { VegaMark } from './VegaMark.ts';
import type { VegaAxis } from './VegaAxis.ts';

/**
 * Result of parsing Vega specification properties.
 */
export interface ParsedProperties {
    /**
     * Array of marks extracted from the Vega specification, each following the {@link VegaMark} structure.
     */
    marks: VegaMark[];
    /**
     * Array of axes extracted from the Vega specification, each following the {@link VegaAxis} structure.
     */
    axes: VegaAxis[];
}

/**
 * Parses the given Vega specification code for various properties.
 * @param code - The Vega specification code as a JSON string.
 * @returns An object containing arrays according to {@link ParsedProperties} structure.
 * If the code is invalid or contains no valid properties, empty arrays are returned for those properties.
 */
export function parseProperties(code: string): ParsedProperties {
    try {
        const spec = JSON.parse(code);
        return {
            marks: Array.isArray(spec.marks) ? spec.marks : [],
            axes: Array.isArray(spec.axes) ? spec.axes : [],
        };
    } catch {
        return { marks: [], axes: [] };
    }
}