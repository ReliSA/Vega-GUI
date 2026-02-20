import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { parseDatasets } from '../types/vega';
import DataTable from './DataTable';

interface DataViewProps {
    code: string;
}

const DataViewPanel: React.FC<DataViewProps> = ({ code }) => {
    const datasets = useMemo(() => parseDatasets(code), [code]);

    return (
        <div style={{ padding: 16, overflow: 'auto', height: '100%' }}>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in spec.</Typography.Text>
            ) : (
                datasets.map(ds => <DataTable key={ds.name} dataset={ds} />)
            )}
        </div>
    );
};

export default DataViewPanel;