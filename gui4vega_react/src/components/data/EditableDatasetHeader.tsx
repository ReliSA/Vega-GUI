import React from 'react';
import { Typography, Button, Checkbox, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface EditableDatasetHeaderProps {
    datasetName: string;
    rowCount: number;
    confirmDelete: boolean;
    onAddRow: () => void;
    onAddColumn: () => void;
    onConfirmDeleteChange: (checked: boolean) => void;
    tableVisible: boolean;
    onToggleTable: () => void;
}

const EditableDatasetHeader: React.FC<EditableDatasetHeaderProps> = ({
    datasetName,
    rowCount,
    confirmDelete,
    onAddRow,
    onAddColumn,
    onConfirmDeleteChange,
    tableVisible,
    onToggleTable,
}) => (
    <Space align="center" style={{ width: '100%' }}>
        <Button
            icon={tableVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={onToggleTable}
            size="small"
            title={tableVisible ? 'Hide Table' : 'Show Table'}
        />
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
            {datasetName}
            <Typography.Text type="secondary" style={{ fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                ({rowCount} rows)
            </Typography.Text>
        </Typography.Title>
        {tableVisible && (
            <>
                <Button size="small" type="primary" onClick={onAddRow}>
                    Add Record
                </Button>
                <Button size="small" onClick={onAddColumn}>
                    Add Column
                </Button>
                <Checkbox
                    checked={confirmDelete}
                    onChange={e => onConfirmDeleteChange(e.target.checked)}
                >
                    Confirm Delete
                </Checkbox>
            </>
        )}
    </Space>
);

export default EditableDatasetHeader;