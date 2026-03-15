/** Converts a value to a display string */
export function toDisplay(value: unknown): string {
    return value !== null && typeof value === 'object'
        ? JSON.stringify(value)
        : String(value ?? '');
}

/** Renames a key in each row of a dataset */
export function renameColumn(rows: Record<string, unknown>[], oldCol: string, newCol: string): Record<string, unknown>[] {
    // Same value, do nothing
    if (oldCol === newCol) return rows;

    rows.forEach(row => {
        if (!Object.prototype.hasOwnProperty.call(row, oldCol)) return;

        const renamedEntries = Object.entries(row).map(([key, value]) =>
            key === oldCol ? [newCol, value] as const : [key, value] as const,
        );

        // Delete row to avoid conflicts
        Object.keys(row).forEach(key => {
            delete row[key];
        });

        // Add renamed entries
        renamedEntries.forEach(([key, value]) => {
            row[key] = value;
        });
    });

    return rows;
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