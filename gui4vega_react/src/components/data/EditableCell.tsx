import React from 'react';
import { Typography } from 'antd';
import { toDisplay } from './utils';

// Maximum number of characters to display in the cell
const MAX_DISPLAY_LENGTH = 20;

interface EditableCellProps {
    value: unknown;
    onSave: (val: unknown) => void;
}

const EditableCell: React.FC<EditableCellProps> = (props) => {
    // Convert the value to a display string
    const display = toDisplay(props.value);

    // Save only if the new value is different from the current
    const handleSave = (val: string) => {
        if (val !== props.value) {
            props.onSave(val);
        }
    };

    return (
        <Typography.Text
            style={{ cursor: 'pointer', maxWidth: 100 }}
            ellipsis={display.length > MAX_DISPLAY_LENGTH ? { tooltip: display } : false}
            editable={{
                onChange: handleSave,
                triggerType: ['text'],
            }}
        >
            {/* Show either data value or placeholder */}
            {display || (
                <Typography.Text type="secondary" italic>
                    Click to edit
                </Typography.Text>
            )}
        </Typography.Text>
    );
};

export default EditableCell;