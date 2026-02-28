import type { ColumnsType } from 'antd/es/table';
import EditableCell from './EditableCell';
import {Space} from "antd";
import DataDeleteButton from "./button/DataDeleteButton.tsx";

export function buildColumns(
    row: Record<string, unknown>,
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void,
    onColumnRename: (oldCol: string, newCol: string) => void,
    onColumnDelete: (col: string) => void,
    confirmDelete: boolean
): ColumnsType<Record<string, unknown>> {
    return Object.keys(row).map((col, colIndex) => ({
        title: (
            <Space align="center" size="small">
                <EditableCell
                    value={col}
                    onSave={newCol => typeof newCol === 'string' ? onColumnRename(col, newCol) : undefined}
                />
                <DataDeleteButton
                    index={colIndex}
                    type="column"
                    confirmDelete={confirmDelete}
                    onDelete={() => onColumnDelete(col)}
                />
            </Space>
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