import React from 'react';
import { Layout, Space, theme } from 'antd';
import SpecLoader from './loader/SpecLoader.tsx';
import SelectionExporter from './exporter/SelectionExporter.tsx';

/**
 * Props for {@link ControlsTab}.
 */
interface ControlsTabProps {
    /**
     * The Vega specification code that is currently being edited or viewed in the editor.
     */
    code: string;
    /**
     * Handler function to change editor code.
     * @param code - The new Vega specification code to set in the editor.
     */
    setCode: (code: string) => void;
    /**
     * Optional flag to hide the import controls.
     */
    hideImport?: boolean;
    /**
     * Optional flag to hide the export controls.
     */
    hideExport?: boolean;
}

/**
 * Component responsible for rendering the controls tab in the editor interface.
 * @param props - {@link ControlsTabProps}
 */
const ControlsTab: React.FC<ControlsTabProps> = (props: ControlsTabProps) => {
    const { token: antdToken } = theme.useToken();

    return (
        <Layout.Header
            style={{
                padding: antdToken.padding,
                lineHeight: 'normal',
                borderBottom: `1px solid ${antdToken.colorBorderSecondary}`,
            }}
        >
            <Space size="middle">
                {!props.hideImport && <SpecLoader setCode={props.setCode} />}
                {!props.hideExport && <SelectionExporter code={props.code} />}
            </Space>
        </Layout.Header>
    );
};

export default ControlsTab;