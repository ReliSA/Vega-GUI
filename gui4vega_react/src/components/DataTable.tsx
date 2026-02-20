import React from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { VegaDataset } from '../types/vega';

interface DataTableProps {
    dataset: VegaDataset;
}

const DataTable: React.FC<DataTableProps> = ({ dataset }) => {
    const columns: ColumnsType<Record<string, unknown>> = Object.keys(dataset.values[0] ?? {}).map(col => ({
        title: col,
        dataIndex: col,
        key: col,
        render: (val: unknown) =>
            val !== null && typeof val === 'object' ? JSON.stringify(val) : String(val ?? ''),
    }));

    const dataSource = dataset.values.map((row, i) => ({ ...row, _rowKey: i }));

    return (
        <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
                {dataset.name}
                <Typography.Text type="secondary" style={{ fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                    ({dataset.values.length} rows)
                </Typography.Text>
            </Typography.Title>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="_rowKey"
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default DataTable;