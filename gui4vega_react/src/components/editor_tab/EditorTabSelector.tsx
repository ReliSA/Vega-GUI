import React from 'react';
import { Tabs } from 'antd';

export type EditorTabKey = 'spec' | 'data' | 'properties';

interface EditorTabSelectorProps {
    activeTab: EditorTabKey;
    onChange: (tabKey: EditorTabKey) => void;
}

const EditorTabSelector: React.FC<EditorTabSelectorProps> = (props) => {
    const tabItems = [
        {
            key: 'spec',
            label: 'Specification',
        },
        {
            key: 'data',
            label: 'Data',
        },
        {
            key: 'properties',
            label: 'Properties',
        },
    ];

    return (
        <Tabs
            activeKey={props.activeTab}
            items={tabItems}
            onChange={(key) => props.onChange(key as EditorTabKey)}
        />
    );
};

export default EditorTabSelector;