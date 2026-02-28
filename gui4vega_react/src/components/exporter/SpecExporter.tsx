import React, { useMemo, useState } from 'react';
import { Button, Modal, Checkbox, message } from 'antd';
import { exportSelectedDatasets } from './helper/exportData.ts';
import { parseDatasets } from '../data/helper/datasetEdit.ts';
import type { ExportedData } from './helper/exportData.ts';
import { UploadOutlined } from "@ant-design/icons";

interface SpecExporterProps {
    code: string;
    onExport?: (data: ExportedData) => void;
}

const SpecExporter: React.FC<SpecExporterProps> = (props) => {
    const datasetObjs = useMemo(() => parseDatasets(props.code), [props.code]);
    const datasetNames = datasetObjs.map(ds => ds.name);
    const [exportModalOpen, setExportModalOpen] = useState(false);
    const [exportSelection, setExportSelection] = useState<string[]>([]);

    // When the user clicks the export button, open the modal and select all datasets by default
    const handleExport = () => {
        try {
            setExportSelection(datasetNames);
            setExportModalOpen(true);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export won\'t work on invalid JSON spec.';
            message.error(errorMsg);
        }
    };

    // When the user confirms the export, call the export function and pass the selected datasets
    const handleExportConfirm = () => {
        try {
            const exported = exportSelectedDatasets(props.code, exportSelection);
            if (props.onExport) props.onExport(exported);
            setExportModalOpen(false);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON specification.';
            message.error(errorMsg);
        }
    };

    // If the user cancels, just close the modal without doing anything
    const handleExportCancel = () => {
        setExportModalOpen(false);
    };

    return (
        <>
            <Button onClick={handleExport} icon={<UploadOutlined />}>
                Export JSON Specification
            </Button>
            <Modal
                title="Select datasets to export"
                open={exportModalOpen}
                onOk={handleExportConfirm}
                onCancel={handleExportCancel}
            >
                <Checkbox.Group
                    options={datasetNames}
                    value={exportSelection}
                    onChange={setExportSelection}
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                />
            </Modal>
        </>
    );
};

export default SpecExporter;