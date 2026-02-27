import React, { useMemo, useState } from 'react';
import { Typography, Space } from 'antd';
import { parseDatasets, updateDatasetValue, addDatasetRow, deleteDatasetRow } from '../../types/vega';
import type { VegaDataset as VegaDatasetType } from '../../types/vega';
import DataTable from './DataTable';

interface DataViewProps {
    code: string;
    onCodeChange: (code: string) => void;
}

const DataView: React.FC<DataViewProps> = ({ code, onCodeChange }: DataViewProps) => {
    const datasets = useMemo(() => parseDatasets(code), [code]);
    // Lock state per dataset, default to true for all datasets
    const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        const parsed = parseDatasets(code);
        parsed.forEach(ds => { initial[ds.name] = true; });
        return initial;
    });

    const handleConfirmDeleteChange = (datasetName: string, value: boolean) => {
        setConfirmDelete(prev => ({ ...prev, [datasetName]: value }));
    };

    return (
        <Space orientation="vertical" style={{ padding: 16, overflow: 'auto', height: '100%' }} size="middle">
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in spec.</Typography.Text>
            ) : (
                datasets.map(ds => (
                    <DataTable
                        key={ds.name}
                        dataset={ds}
                        onCellChange={(rowIndex, col, newValue) =>
                            onCodeChange(updateDatasetValue(code, ds.name, rowIndex, col, newValue))
                        }
                        onAddRow={() => {
                            // Create a new row with same keys as first row, empty values
                            const keys = Object.keys(ds.values[0] ?? {});
                            const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
                            onCodeChange(addDatasetRow(code, ds.name, newRow));
                        }}
                        onDeleteRow={rowIndex =>
                            onCodeChange(deleteDatasetRow(code, ds.name, rowIndex))
                        }
                        confirmDelete={confirmDelete[ds.name]}
                        onConfirmDeleteChange={value => handleConfirmDeleteChange(ds.name, value)}
                        onColumnRename={(_oldCol, _newCol, updatedRows) => {
                            // Update the dataset in the spec
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {
                                // If parsing fails, do nothing
                            }
                        }}
                        onColumnDelete={(_col, updatedRows) => {
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {
                                // If parsing fails, do nothing
                            }
                        }}
                        onColumnAdd={(_col, updatedRows) => {
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {
                                // If parsing fails, do nothing
                            }
                        }}
                    />
                ))
            )}
        </Space>
    );
};

export default DataView;