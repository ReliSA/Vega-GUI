import React from 'react';
import { Tabs } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import DataView from './DataView';

interface EditorTabsProps {
    code: string;
    onChange: (value: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ code, onChange }) => {
    const tabItems = [
        {
            key: 'spec',
            label: 'Spec',
            children: (
                <CodeMirror
                    value={code}
                    height="100%"
                    extensions={[json()]}
                    onChange={onChange}
                />
            ),
        },
        {
            key: 'data',
            label: 'Data',
            children: <DataView code={code} />,
        },
    ];

    return (
        <Tabs
            defaultActiveKey="spec"
            items={tabItems}
            style={{ height: '100%' }}
            styles={{ content: { height: 'calc(100% - 46px)', overflow: 'auto' } }}
        />
    );
};

export default EditorTabs;