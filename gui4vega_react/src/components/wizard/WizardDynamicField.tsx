import React from 'react';
import { Form, Select, ColorPicker } from 'antd';
import type { WizardField } from './adapters/WizardAdapter';

interface WizardDynamicFieldProps {
    field: WizardField;
    availableFields: string[];
}

export const WizardDynamicField: React.FC<WizardDynamicFieldProps> = (props: WizardDynamicFieldProps) => {
    const normalizeColor = (color: string | { toHexString: () => string }) => {
        if (typeof color === 'string') {
            return color;
        }
        return color?.toHexString();
    };

    return (
        <Form.Item
            key={props.field.name}
            name={['fields', props.field.name]}
            label={props.field.label}
            rules={[{ required: props.field.required, message: `Please select ${props.field.label}` }]}
            initialValue={props.field.defaultValue}
            getValueFromEvent={props.field.type === 'color' ? normalizeColor : undefined}
        >
            {props.field.type === 'color' ? (
                <ColorPicker showText />
            ) : (
                <Select
                    placeholder={`Select ${props.field.label}`}
                    allowClear={!props.field.required}
                    options={props.availableFields.map(f => ({ label: f, value: f }))}
                />
            )}
        </Form.Item>
    );
};