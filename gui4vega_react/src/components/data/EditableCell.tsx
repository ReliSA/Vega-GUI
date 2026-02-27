import React, { useState } from 'react';
import { Input, Typography, Tooltip } from 'antd';
import { toDisplay, coerce } from './utils';

// Maximum number of characters to display in the cell
const MAX_DISPLAY_LENGTH = 20;

interface EditableCellProps {
    value: unknown;
    onSave: (val: unknown) => void;
}

const EditableCell: React.FC<EditableCellProps> = (props) => {
    // Convert the value to a display string
    const display = toDisplay(props.value);

    // State to track if user is in edit mode
    const [editing, setEditing] = useState(false);

    // Initialize input value with the current display string
    const [inputVal, setInputVal] = useState(display);

    // Function to save the new value, converting it back to original type
    const save = () => {
        setEditing(false);
        props.onSave(coerce(inputVal));
    };

    // If in edit mode, show an input field
    if (editing) {
        return (
            <Input
                autoFocus
                size="small"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onBlur={save}
                onPressEnter={save}
                style={{ minWidth: 80 }}
            />
        );
    }

    // Truncate long values and show ellipsis, with tooltip for full value
    const truncated = display.length > MAX_DISPLAY_LENGTH
        ? display.slice(0, MAX_DISPLAY_LENGTH) + '...'
        : display;

    return (
        <span
            onClick={() => { setInputVal(display); setEditing(true); }}
            style={{ cursor: 'pointer', display: 'block', minWidth: 80, color: display === '' ? '#aaa' : undefined }}
            title="Click to edit"
        >
            {display === '' ? (
                <em>Click to edit</em>
            ) : (
                display.length > MAX_DISPLAY_LENGTH ? (
                    <Tooltip title={display} placement="topLeft">
                        <Typography.Text ellipsis style={{ maxWidth: 200 }}>{truncated}</Typography.Text>
                    </Tooltip>
                ) : (
                    <Typography.Text>{display}</Typography.Text>
                )
            )}
        </span>
    );
};

export default EditableCell;