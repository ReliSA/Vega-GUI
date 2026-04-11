import React from 'react';
import { Card, Tag, Typography, Table, Empty, Flex } from 'antd';
import type { VegaMark } from './helper/VegaMark.ts';

/**
 * Props for {@link MarkCard}.
 */
interface MarkCardProps {
    /**
     * The Vega mark object.
     */
    mark: VegaMark;
    /**
     * The index of the mark in the Vega specification, used for identifying which mark is being edited when properties change.
     */
    markIndex: number;
    /**
     * Callback function that is called when the user changes a property of the mark's encode sets.
     * @param markIndex - The index of the mark being updated.
     * @param encodeSet - The encode set being updated.
     * @param property - The name of the property being updated within the encode set.
     * @param field - The specific field within the property being updated.
     * @param newValue - The new value entered by the user for the specified property field, which can be of any type.
     */
    onPropertyChange: (markIndex: number, encodeSet: string, property: string, field: string, newValue: unknown) => void;
}

// Detectable encode sets in Vega marks
const ENCODE_SETS = ['enter', 'update', 'hover', 'exit'];

/**
 * Component responsible for editing of properties of a Vega mark.
 * @param props - {@link MarkCardProps}
 */
const MarkCard: React.FC<MarkCardProps> = (props) => {
    // Row data for the properties table
    const rows: { key: string; property: string; field: string; value: unknown; encodeSet: string }[] = [];

    // Extract properties from each mark encode set
    ENCODE_SETS.forEach(encodeSet => {
        // Get the encode set object for the current mark
        const setObj = props.mark.encode?.[encodeSet];
        if (!setObj) return;

        // Extract fields and values
        Object.entries(setObj).forEach(([property, entry]) => {
            if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
                Object.entries(entry).forEach(([field, value]) => {
                    rows.push({ key: `${encodeSet}-${property}-${field}`, property, field, value, encodeSet });
                });
            }
        });
    });

    return (
        <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
                <Flex align="center" gap={8}>
                    <Tag color="blue">{props.mark.type}</Tag>
                    {props.mark.from?.data && (
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            from: {props.mark.from.data}
                        </Typography.Text>
                    )}
                </Flex>
            }
        >
            {rows.length === 0 ? (
                <Empty description="No encode properties" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <Table
                    dataSource={rows}
                    size="small"
                    pagination={false}
                >
                    <Table.Column title="Set" dataIndex="encodeSet" key="encodeSet" width={80} render={(val: string) => <Tag>{val}</Tag>} />
                    <Table.Column title="Property" dataIndex="property" key="property" width={120} />
                    <Table.Column title="Field" dataIndex="field" key="field" width={100} render={(val: string) => <Typography.Text type="secondary">{val}</Typography.Text>} />
                    <Table.Column title="Value" dataIndex="value" key="value" render={(val: unknown, row: { encodeSet: string; property: string; field: string; }) => {
                        const display = val !== null && typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
                        return (
                            <Typography.Text
                                editable={{
                                    onChange: newVal => {
                                        const coerced = newVal.trim() !== '' && !isNaN(Number(newVal)) ? Number(newVal) : newVal;
                                        props.onPropertyChange(props.markIndex, row.encodeSet, row.property, row.field, coerced);
                                    },
                                }}
                            >
                                {display}
                            </Typography.Text>
                        );
                    }} />
                </Table>
            )}
        </Card>
    );
};

export default MarkCard;