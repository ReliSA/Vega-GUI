/** Converts a value to a display string */
export function toDisplay(value: unknown): string {
    return value !== null && typeof value === 'object'
        ? JSON.stringify(value)
        : String(value ?? '');
}

/** Attempts to coerce a string to a number if possible */
export function coerce(raw: string): unknown {
    return raw.trim() !== '' && !isNaN(Number(raw)) ? Number(raw) : raw;
}

/** Renames a key in each row of a dataset */
export function renameColumn(rows: Record<string, unknown>[], oldCol: string, newCol: string): Record<string, unknown>[] {
    return rows.map(row => {
        const newRow = { ...row };
        newRow[newCol] = newRow[oldCol];
        delete newRow[oldCol];
        return newRow;
    });
}

/** Deletes a key from each row of a dataset */
export function deleteColumn(rows: Record<string, unknown>[], col: string): Record<string, unknown>[] {
    return rows.map(row => {
        const newRow = { ...row };
        delete newRow[col];
        return newRow;
    });
}

/** Adds a new column to each row of a dataset */
export function addColumn(rows: Record<string, unknown>[], col: string): Record<string, unknown>[] {
    return rows.map(row => ({ ...row, [col]: '' }));
}