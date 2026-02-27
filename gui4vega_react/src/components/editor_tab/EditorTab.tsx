import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import EditorTabSelector from './EditorTabSelector';
import EditorTabContent from './EditorTabContent.tsx';
import type { EditorTabKey } from './EditorTabSelector';

interface EditorTabsProps {
    height: string;
    code: string;
    onChange: (value: string) => void;
}

const EditorTab: React.FC<EditorTabsProps> = (props) => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // State to track the active tab
    const [activeTab, setActiveTab] = useState<EditorTabKey>('spec');

    return (
        <Layout style={{ height: props.height }}>
            <Layout.Header style={{ background: antdToken.colorBgContainer }}>
                <EditorTabSelector activeTab={activeTab} onChange={setActiveTab} />
            </Layout.Header>

            { /* Overflow needs to be 'auto', otherwise whole layout with the tabs part will scroll with the content */ }
            <Layout.Content style={{ background: antdToken.colorBgContainer, overflow: 'auto' }}>
                <EditorTabContent activeTab={activeTab} code={props.code} onChange={props.onChange} />
            </Layout.Content>
        </Layout>
    );
};

export default EditorTab;