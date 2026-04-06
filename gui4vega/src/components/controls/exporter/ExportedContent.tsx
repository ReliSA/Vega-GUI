import React from 'react';
import { Row, Col, Flex, Typography, Input, Button, Space } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ExportedData } from './helper/exportSelectedData';
import { copyToClipboard, downloadAsFile } from './helper/ExportedContentActions.ts';

const { Text } = Typography;
const { TextArea } = Input;

/**
 * Props for {@link ExportedContent}.
 */
export interface ExportedContentProps {
    /**
     * The exported data containing the Vega specification, datasets, and signals that are selected for export.
     */
    data: ExportedData;
}

/**
 * Component responsible for displaying the exported Vega specification, datasets, and signals in a structured layout.
 * @param props - {@link ExportedContentProps}
 */
const ExportedContent: React.FC<ExportedContentProps> = (props: ExportedContentProps) => {
    //
    const formatData = (val: string | string[]) =>
        Array.isArray(val) ? val.join('\n') : val;

    // Sections to be displayed
    const sections = [
        { title: 'Exported Specification', value: props.data.spec, file: 'spec.json' },
        { title: 'Exported Datasets', value: formatData(props.data.datasets), file: 'datasets.json' },
        { title: 'Exported Signals', value: formatData(props.data.signals), file: 'signals.json' },
    ];

    return (
        <Row gutter={[16, 16]}>
            {sections.map((section) => (
                <Col span={8}>
                    <Flex vertical gap={8}>
                        <Flex justify="space-between" align="center">
                            <Text strong>{section.title}:</Text>
                            <Space>
                                <Button
                                    size="small"
                                    icon={<CopyOutlined />}
                                    onClick={() => copyToClipboard(section.value)}
                                />
                                <Button
                                    size="small"
                                    icon={<DownloadOutlined />}
                                    onClick={() => downloadAsFile(section.value, section.file)}
                                />
                            </Space>
                        </Flex>
                        <TextArea
                            readOnly
                            value={section.value}
                            autoSize={{ minRows: 10, maxRows: 10 }}
                        />
                    </Flex>
                </Col>
            ))}
        </Row>
    );
}

export default ExportedContent;