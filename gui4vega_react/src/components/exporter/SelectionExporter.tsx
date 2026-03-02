import React from 'react';
import { Button, Modal, Checkbox, Typography, Divider, Flex, Layout } from 'antd';
import {useSelectionExporter} from "./hooks/useSelectionExporter.ts";
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface SelectionExporterProps {
    code: string;
    onExport?: (data: ExportedData) => void;
}

const SelectionExporter: React.FC<SelectionExporterProps> = (props: SelectionExporterProps) => {
    const {
        isModalOpen,
        datasetNames,
        signalNames,
        datasetSelection,
        signalSelection,
        setDatasetSelection,
        setSignalSelection,
        openExporter,
        closeExporter,
        confirmExport
    } = useSelectionExporter({ code: props.code, onExportSuccess: props.onExport });

    return (
        <>
            <Button onClick={openExporter} icon={<UploadOutlined />}>
                Export by Selection
            </Button>

            <Modal
                title="Select datasets and signals to export"
                open={isModalOpen}
                onOk={confirmExport}
                onCancel={closeExporter}
                width={800}
            >
                <Divider style={{ width: 'auto' }} />
                <Flex gap="large" style={{ minHeight: 200 }}>
                    {datasetNames.length > 0 && (
                        <Flex vertical flex={1} style={{ minWidth: 0 }}>
                            <Title level={5}>Datasets</Title>
                            <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                                <Checkbox.Group
                                    options={datasetNames}
                                    value={datasetSelection}
                                    onChange={setDatasetSelection}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                />
                            </Layout>
                        </Flex>
                    )}

                    {datasetNames.length > 0 && signalNames.length > 0 && <Divider vertical style={{ height: 'auto' }} />}

                    {signalNames.length > 0 && (
                        <Flex vertical flex={1} style={{ minWidth: 0 }}>
                            <Title level={5}>Signals</Title>
                            <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                                <Checkbox.Group
                                    options={signalNames}
                                    value={signalSelection}
                                    onChange={setSignalSelection}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                />
                            </Layout>
                        </Flex>
                    )}
                </Flex>
            </Modal>
        </>
    );
};

export default SelectionExporter;