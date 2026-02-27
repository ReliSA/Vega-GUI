import React from 'react';
import { Card, Typography, Flex } from 'antd';
import DataTable from './DataTable';
import type { VegaDataset as VegaDatasetType } from '../../types/vega';
import { updateDatasetValue, addDatasetRow, deleteDatasetRow } from '../../types/vega';

interface DatasetCardProps {
    ds: VegaDatasetType;
    code: string;
    onCodeChange: (code: string) => void;
    confirmDelete: boolean;
    onConfirmDeleteChange: (value: boolean) => void;
    deleteButton: React.ReactNode;
}

const DatasetCard: React.FC<DatasetCardProps> = (props) => {
    // Helper to update dataset values in the spec
    const updateDatasetRows = (updatedRows: Record<string, unknown>[]) => {
        try {
            const spec = JSON.parse(props.code);
            const dataset = spec.data.find((d: VegaDatasetType) => d.name === props.ds.name);
            if (dataset) {
                dataset.values = updatedRows;
            }
            props.onCodeChange(JSON.stringify(spec, null, 2));
        } catch {
            // If parsing fails, do nothing
        }
    };

    return (
        <Card key={props.ds.name}>
            <Flex justify="space-between" align="center">
                <Typography.Text strong>{props.ds.name}</Typography.Text>
                {props.deleteButton}
            </Flex>
            <DataTable
                dataset={props.ds}
                onCellChange={(rowIndex, col, newValue) =>
                    props.onCodeChange(updateDatasetValue(props.code, props.ds.name, rowIndex, col, newValue))
                }
                onAddRow={() => {
                    const keys = Object.keys(props.ds.values[0] ?? {});
                    const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Record<string, unknown>);
                    props.onCodeChange(addDatasetRow(props.code, props.ds.name, newRow));
                }}
                onDeleteRow={rowIndex =>
                    props.onCodeChange(deleteDatasetRow(props.code, props.ds.name, rowIndex))
                }
                confirmDelete={props.confirmDelete}
                onConfirmDeleteChange={props.onConfirmDeleteChange}
                onColumnRename={(_oldCol, _newCol, updatedRows) => updateDatasetRows(updatedRows)}
                onColumnDelete={(_col, updatedRows) => updateDatasetRows(updatedRows)}
                onColumnAdd={(_col, updatedRows) => updateDatasetRows(updatedRows)}
            />
        </Card>
    );
};

export default DatasetCard;