import { useMemo } from 'react';
import { Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditableCell from '../EditableCell';
import DataDeleteButton from '../button/DataDeleteButton';
import type { VegaDataset } from "../helper/VegaDataset.ts";

interface DatasetColumnsProps {
    dataset: VegaDataset;
    confirmDelete: boolean;
    onColumnRename: (oldCol: string, newCol: string) => void;
    onColumnDelete: (col: string) => void;
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
    onDeleteRow: (rowIndex: number) => void;
}

export const useDatasetColumns = (props: DatasetColumnsProps) => {
    return useMemo(() => {
        const firstRow = props.dataset?.values?.[0] || {};

        const cols: ColumnsType<Record<string, unknown>> = Object.keys(firstRow).map((col, colIndex) => ({
            title: (
                <Flex align="center" justify="space-between" gap="small">
                    <EditableCell
                        value={col}
                        onSave={(newCol) => props.onColumnRename(col, newCol)}
                    />
                    <DataDeleteButton
                        index={colIndex}
                        type="column"
                        confirmDelete={props.confirmDelete}
                        onDelete={() => props.onColumnDelete(col)}
                    />
                </Flex>
            ),
            dataIndex: col,
            key: col,
            width: 180,
            render: (val, _, rowIndex) => (
                <EditableCell
                    value={val}
                    onSave={(newValue) => props.onCellChange(rowIndex, col, newValue)}
                />
            ),
        }));

        // Delete button column
        cols.push({
            title: '',
            key: 'delete',
            width: 40,
            fixed:'right',
            align:'center',
            render: (_, __, rowIndex) => (
                <DataDeleteButton
                    index={rowIndex}
                    type='record'
                    confirmDelete={props.confirmDelete}
                    onDelete={() => props.onDeleteRow(rowIndex)}
                />
            ),
        });

        return cols;
    }, [props]);
};