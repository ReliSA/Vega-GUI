import React, { useMemo } from 'react';
import { Form, Select, Button, Card, Segmented } from 'antd';
import { parseDatasets } from '../data/helper/datasetEdit';
import { generateSpec, adapters, type ChartType } from './helper/wizardSpec';
import type { VegaEditorState } from '../useVegaEditor';

interface WizardViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

interface WizardFormValues {
    chartType: ChartType;
    dataset: string;
    fields: Record<string, string>;
}

const WizardView: React.FC<WizardViewProps> = (props: WizardViewProps) => {
    const [form] = Form.useForm();
    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    const datasetName = Form.useWatch('dataset', form);
    const chartType = Form.useWatch('chartType', form) as ChartType;

    const fields = useMemo(() => {
        if (!datasetName) return [];
        const selectedDataset = datasets.find(d => d.name === datasetName);
        if (selectedDataset && selectedDataset.values.length > 0) {
            return Object.keys(selectedDataset.values[0]);
        }
        return [];
    }, [datasetName, datasets]);

    const adapterFields = useMemo(() => {
        if (!chartType) return [];
        const adapter = adapters[chartType];
        return adapter ? adapter.getFields() : [];
    }, [chartType]);

    const handleFinish = (values: WizardFormValues) => {
        const { chartType, dataset, fields } = values;

        const newCode = generateSpec(props.editorState.code, {
            chartType,
            datasetName: dataset,
            fields
        });

        props.editorState.setCode(newCode);
    };

    return (
        <Card variant={'borderless'} style={{ height: '100%', overflowY: 'auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ chartType: 'bar' }}
            >
                <Form.Item name="chartType" label="Chart Type">
                    <Segmented
                        block
                        options={[
                            { label: 'Bar Chart', value: 'bar' },
                            { label: 'Circular Chart', value: 'pie' }
                        ]}
                    />
                </Form.Item>

                <Form.Item name="dataset" label="Dataset">
                    <Select
                        placeholder="Select a dataset"
                        options={datasets.map(ds => ({ label: ds.name, value: ds.name }))}
                    />
                </Form.Item>

                {datasetName && adapterFields.map(field => (
                    <Form.Item
                        key={field.name}
                        name={['fields', field.name]}
                        label={field.label}
                        rules={[{ required: field.required, message: `Please select ${field.label}` }]}
                        tooltip={field.description}
                    >
                        <Select
                            placeholder={`Select ${field.label}`}
                            allowClear={!field.required}
                            options={fields.map(f => ({ label: f, value: f }))}
                        />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button block type="primary" htmlType="submit" disabled={!datasetName}>
                        Generate Visualization
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default WizardView;