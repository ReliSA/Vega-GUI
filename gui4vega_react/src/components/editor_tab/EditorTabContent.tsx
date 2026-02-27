import React from 'react';
import SpecView from '../spec/SpecView.tsx';
import DataView from '../data/DataView';
import PropertiesView from '../properties/PropertiesView';
import type { EditorTabKey } from './EditorTabSelector';

interface EditorContentProps {
    activeTab: EditorTabKey;
    code: string;
    onChange: (value: string) => void;
}

const EditorTabContent: React.FC<EditorContentProps> = (props) => {
    switch (props.activeTab) {
        case 'spec':
            return <SpecView code={props.code} onChange={props.onChange} />;
        case 'data':
            return <DataView code={props.code} onCodeChange={props.onChange} />;
        case 'properties':
            return <PropertiesView code={props.code} onCodeChange={props.onChange} />;
        default:
            return null;
    }
};

export default EditorTabContent;