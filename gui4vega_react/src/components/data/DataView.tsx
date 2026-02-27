import React, { useMemo, useState } from 'react';
import { Typography, Space, message, Modal } from 'antd';
import { parseDatasets, addDataset, deleteDataset } from '../../types/vega';
import AddDatasetButton from './AddDatasetButton.tsx';
import DatasetCard from './DatasetCard';

interface DataViewProps {
    code: string;
    onCodeChange: (code: string) => void;
}

const DataView: React.FC<DataViewProps> = (props) => {
    // Parse datasets from spec, memoized by code
    const datasets = useMemo(() => parseDatasets(props.code), [props.code]);

    // Track confirmDelete state per dataset
    const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        const parsed = parseDatasets(props.code);
        parsed.forEach(ds => { initial[ds.name] = true; });
        return initial;
    });

    // Update confirmDelete state for a dataset
    const handleConfirmDeleteChange = (datasetName: string, value: boolean) => {
        setConfirmDelete(prev => ({ ...prev, [datasetName]: value }));
    };

    // Add dataset handler
    const handleAddDataset = (datasetName: string) => {
        const trimmed = datasetName.trim();
        if (!trimmed) {
            message.error('Dataset name cannot be empty.');
            return;
        }
        if (datasets.some(ds => ds.name === trimmed)) {
            message.error('Dataset name already exists.');
            return;
        }
        props.onCodeChange(addDataset(props.code, trimmed, [{ NewColumn: '' }]));
    };

    // Delete dataset handler
    const handleDeleteDataset = (datasetName: string) => {
        Modal.confirm({
            title: `Delete dataset "${datasetName}"?`,
            content: 'This will remove the entire dataset and all its data. This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                props.onCodeChange(deleteDataset(props.code, datasetName));
            },
        });
    };

    return (
        <Space orientation="vertical" style={{ width: '100%', height: '100%', padding: 16, overflow: 'auto' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={5} style={{ margin: 0 }}>Datasets</Typography.Title>
                <AddDatasetButton onAdd={handleAddDataset} />
            </div>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in spec.</Typography.Text>
            ) : (
                datasets.map(ds => (
                    <DatasetCard
                        key={ds.name}
                        ds={ds}
                        code={props.code}
                        onCodeChange={props.onCodeChange}
                        confirmDelete={confirmDelete[ds.name]}
                        onConfirmDeleteChange={value => handleConfirmDeleteChange(ds.name, value)}
                        onDelete={handleDeleteDataset}
                    />
                ))
            )}
        </Space>
    );
};

export default DataView;