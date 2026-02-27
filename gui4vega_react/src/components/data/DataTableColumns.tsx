import type { ColumnsType } from 'antd/es/table';
import EditableCell from './EditableCell';
import React, { useState } from 'react';
import DeleteDataButton from './DeleteDataButton';

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

const EditableColumnHeader: React.FC<{ col: string; colIndex: number; onRename: (newCol: string) => void; onDelete: () => void; confirmDelete: boolean }> = ({ col, colIndex, onRename, onDelete, confirmDelete }) => {
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState(col);
    const save = () => {
        setEditing(false);
        if (inputVal && inputVal !== col) onRename(inputVal);
    };
    if (editing) {
        return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    autoFocus
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onBlur={save}
                    onKeyDown={e => { if (e.key === 'Enter') save(); }}
                    style={{ minWidth: 80 }}
                />
                <DeleteDataButton
                    index={colIndex}
                    type='column'
                    confirmDelete={confirmDelete}
                    onDelete={() => onDelete()}
                />
            </span>
        );
    }
    return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setEditing(true)} title="Click to rename">
                {col}
            </span>
            <DeleteDataButton
                index={colIndex}
                type="column"
                confirmDelete={confirmDelete}
                onDelete={() => onDelete()}
            />
        </span>
    );
};