import React, { useState } from 'react';
import { Table, Space } from 'antd';
import type { VegaDataset } from '../../types/vega';
import { buildColumns } from './DataTableColumns';
import DeleteDataButton from './DeleteDataButton.tsx';
import { renameColumn, deleteColumn, addColumn } from './utils';
import EditableDatasetHeader from './EditableDatasetHeader';

interface DataTableProps {
    dataset: VegaDataset;
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
    onAddRow: () => void;
    onDeleteRow: (rowIndex: number) => void;
    confirmDelete: boolean;
    onConfirmDeleteChange: (value: boolean) => void;
    onColumnRename?: (oldCol: string, newCol: string, updatedRows: Record<string, unknown>[]) => void;
    onColumnDelete?: (col: string, updatedRows: Record<string, unknown>[]) => void;
    onColumnAdd?: (col: string, updatedRows: Record<string, unknown>[]) => void;
}

const DataTable: React.FC<DataTableProps> = (props) => {
    const [tableVisible, setTableVisible] = useState(true);

    // Update all rows: rename key oldCol to newCol
    const handleColumnRename = (oldCol: string, newCol: string) => {
        const updatedRows = renameColumn(props.dataset.values, oldCol, newCol);
        if (props.onColumnRename) props.onColumnRename(oldCol, newCol, updatedRows);
    };

    // Only perform the delete, confirmation is handled by DeleteDataButton
    const handleColumnDelete = (col: string) => {
        const updatedRows = deleteColumn(props.dataset.values, col);
        if (props.onColumnDelete) props.onColumnDelete(col, updatedRows);
    };

    const handleColumnAdd = () => {
        const col = prompt('Enter new column name:');
        if (!col) return;
        if (Object.keys(props.dataset.values[0] ?? {}).includes(col)) {
            alert('Column already exists!');
            return;
        }
        const updatedRows = addColumn(props.dataset.values, col);
        if (props.onColumnAdd) props.onColumnAdd(col, updatedRows);
    };

    // Define each column
    const columns = buildColumns(
        props.dataset.values[0] ?? {},
        props.onCellChange,
        handleColumnRename,
        handleColumnDelete,
        props.confirmDelete
    );

    // Add delete column at the end
    const columnsWithDelete = [
        ...columns,
        {
            title: '',
            key: 'delete',
            render: (_: unknown, _row: Record<string, unknown>, rowIndex: number) => (
                <DeleteDataButton
                    index={rowIndex}
                    type='record'
                    confirmDelete={props.confirmDelete}
                    onDelete={props.onDeleteRow}
                />
            ),
        },
    ];
    const dataSource = props.dataset.values.map((row, i) => ({ ...row, _rowKey: i }));

    return (
        <Space orientation="vertical" size="middle">
            <EditableDatasetHeader
                datasetName={props.dataset.name}
                rowCount={props.dataset.values.length}
                confirmDelete={props.confirmDelete}
                onAddRow={props.onAddRow}
                onAddColumn={handleColumnAdd}
                onConfirmDeleteChange={props.onConfirmDeleteChange}
                tableVisible={tableVisible}
                onToggleTable={() => setTableVisible(v => !v)}
            />
            {tableVisible && (
                <Table
                    columns={columnsWithDelete}
                    dataSource={dataSource}
                    rowKey="_rowKey"
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
            )}
        </Space>
    );
};

export default DataTable;