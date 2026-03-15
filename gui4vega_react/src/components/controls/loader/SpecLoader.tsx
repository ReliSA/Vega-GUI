import React from 'react';
import { Upload, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { gui4VegaLogger } from '../../../logger';

/**
 * Props for {@link SpecLoader}.
 */
interface SpecLoaderProps {
    /**
     * Callback function that is called when a new Vega specification is loaded using the file upload functionality.
     * @param code - The loaded Vega specification serialized as formatted JSON.
     */
    setCode: (code: string) => void;
}

/**
 * Component responsible for rendering a file upload button to load a Vega specification from a JSON file.
 * @param props - {@link SpecLoaderProps}
 */
const SpecLoader: React.FC<SpecLoaderProps> = (props: SpecLoaderProps) => {
    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            try {
                JSON.parse(content);
                props.setCode(content);
                message.success('JSON specification loaded successfully');
            } catch (err) {
                message.error('Failed to parse JSON file');
                gui4VegaLogger.error('Failed to parse JSON file: ', err);
            }
        };
        reader.readAsText(file);
        return false;
    };

    return (
        <Upload beforeUpload={handleFileUpload} showUploadList={false} accept=".json">
            <Button icon={<DownloadOutlined />}>
                Load JSON Specification
            </Button>
        </Upload>
    );
};

export default SpecLoader;