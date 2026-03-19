import React from 'react';
import { Typography } from 'antd';
import { toDisplay } from './helper/dataEdit.ts';

const { Text } = Typography;

// Maximum number of characters to display in the cell
const MAX_DISPLAY_LENGTH = 20;

interface EditableCellProps {
    value: unknown;
    onSave: (val: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = (props: EditableCellProps) => {
    // Convert the value to a display string
    const display = toDisplay(props.value);

    return (
        <Text
            style={{ cursor: 'pointer', maxWidth: 100 }}
            ellipsis={display.length > MAX_DISPLAY_LENGTH ? { tooltip: display } : false}
            editable={{
                onChange: props.onSave,
                triggerType: ['text'],
            }}
        >
            {/* Show either data value or placeholder */}
            {display || (
                <Text type="secondary" italic>
                    Click to edit
                </Text>
            )}
        </Text>
    );
};

export default EditableCell;