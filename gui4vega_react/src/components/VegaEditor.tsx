import React, { useState, useEffect, useRef } from 'react';
import vegaEmbed from 'vega-embed';
import { ConfigProvider } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './EditorTabs';

const VegaEditor: React.FC = () => {
    const [code, setCode] = useState(JSON.stringify(defaultSpec, null, 2));
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                const spec = JSON.parse(code);
                await vegaEmbed(vegaContainerRef.current, spec, { actions: true });
            } catch (err) {
                console.error('Invalid Vega Spec:', err);
            }
        };
        renderVega();
    }, [code]);

    return (
        <ConfigProvider>
            <div style={{ display: 'flex', height: '100vh', gap: 8, padding: 8, backgroundColor: '#f5f5f5' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <EditorTabs code={code} onChange={setCode} />
                </div>
                <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 4, padding: 16, overflow: 'hidden' }}>
                    <div ref={vegaContainerRef} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VegaEditor;