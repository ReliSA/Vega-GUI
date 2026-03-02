import React from 'react';
import { Button, message } from 'antd';
import { exportSpecOnly } from './helper/exportSelectedData.ts';
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";

interface SpecExporterProps {
    code: string;
    onExport?: (data: ExportedData) => void;
}

const SpecExporter: React.FC<SpecExporterProps> = (props: SpecExporterProps) => {
    const handleExport = () => {
        try {
            exportSpecOnly(props.code);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON specification.';
            message.error(errorMsg);
        }
    };

    return (
        <Button onClick={handleExport} icon={<UploadOutlined />}>
            Export JSON Specification
        </Button>
    );
};

export default SpecExporter;