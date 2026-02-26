import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { theme } from 'antd';

interface SpecViewProps {
    code: string;
    onChange: (value: string) => void;
}

const SpecView: React.FC<SpecViewProps> = ({ code, onChange }: SpecViewProps) => {
    // Access Ant Design theme token
    const { token } = theme.useToken();

    // Do the best to determine if theme is dark
    const isDarkMode = token.colorBgContainer === '#141414' ||
        token.colorTextBase === '#fff' ||
        token.colorBgBase.includes('0, 0, 0');

    return (
        <CodeMirror
            value={code}
            extensions={[json()]}
            onChange={onChange}
            theme={isDarkMode ? vscodeDark : vscodeLight}
        />
    );
};

export default SpecView;