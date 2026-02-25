import React, { useState, useEffect } from 'react';
import { ConfigProvider, Splitter, Layout, theme } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './editor/EditorTabs';
import SpecLoader from './loader/SpecLoader';
import VegaView from './viewer/VegaView';
import type { VegaEditorProps } from '../types';

const VegaEditor: React.FC<VegaEditorProps> = ({ initialSchema, height, width = '100%' }) => {
    const { token: antdToken } = theme.useToken();

    useEffect(() => {
        if (!height) {
            throw new Error('gui4vega - VegaEditor: prop "height" is required and must be a string (e.g. "600px" or "100vh").');
        }
    }, [height]);

    const [code, setCode] = useState<string>(() => JSON.stringify(initialSchema ?? defaultSpec, null, 2));

    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return (
        <ConfigProvider>
            <Layout style={{ width, height, background: antdToken.colorBgContainer }}>
                <Layout.Header style={{
                    padding: antdToken.padding,
                    background: antdToken.colorBgContainer,
                    height: 'auto',
                    lineHeight: 'normal',
                    borderBottom: `1px solid ${antdToken.colorBorderSecondary}`
                }}>
                    <SpecLoader onLoad={handleSpecLoad} />
                </Layout.Header>
                <Layout.Content style={{ overflow: 'hidden' }}>
                    <Splitter style={{ height: '100%', boxShadow: antdToken.boxShadowTertiary }}>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <EditorTabs code={code} onChange={setCode} />
                        </Splitter.Panel>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <VegaView code={code} />
                        </Splitter.Panel>
                    </Splitter>
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
};

export default VegaEditor;