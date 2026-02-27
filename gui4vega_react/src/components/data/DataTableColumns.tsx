import type { ColumnsType } from 'antd/es/table';
import EditableCell from './EditableCell';
import EditableColumnHeader from './EditableColumnHeader';

export function buildColumns(
    row: Record<string, unknown>,
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void,
    onColumnRename: (oldCol: string, newCol: string) => void,
    onColumnDelete: (col: string) => void,
    confirmDelete: boolean
): ColumnsType<Record<string, unknown>> {
    return Object.keys(row).map((col, colIndex) => ({
        title: (
            <EditableColumnHeader
                col={col}
                colIndex={colIndex}
                onRename={newCol => onColumnRename(col, newCol)}
                onDelete={() => onColumnDelete(col)}
                confirmDelete={confirmDelete}
            />
        ),
        dataIndex: col,
        key: col,
        render: (val: unknown, _row: Record<string, unknown>, rowIndex: number) => (
            <EditableCell
                value={val}
                onSave={newValue => onCellChange(rowIndex, col, newValue)}
            />
        ),
    }));
}