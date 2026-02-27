import React, { useState } from 'react';
import { toDisplay } from './utils';
import DeleteDataButton from './DeleteDataButton';
import { Input, Space, Typography } from 'antd';

interface EditableColumnHeaderProps {
    col: string;
    colIndex: number;
    onRename: (newCol: string) => void;
    onDelete: () => void;
    confirmDelete: boolean;
}

const EditableColumnHeader: React.FC<EditableColumnHeaderProps> = (props) => {
    // State to track if user is in edit mode
    const [editing, setEditing] = useState(false);

    // Initialize input value with the current column name
    const [inputVal, setInputVal] = useState(props.col);

    // Function to save the new column name
    const save = () => {
        setEditing(false);
        if (inputVal && inputVal !== props.col) props.onRename(inputVal);
    };

    // If in edit mode, show an input field and a delete button
    if (editing) {
        return (
            <Space align="center">
                <Input
                    autoFocus
                    size="small"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onBlur={save}
                    onPressEnter={save}
                    style={{ minWidth: 80 }}
                />
                <DeleteDataButton
                    index={props.colIndex}
                    type='column'
                    confirmDelete={props.confirmDelete}
                    onDelete={props.onDelete}
                />
            </Space>
        );
    }

    return (
        <Space align="center">
            <Typography.Text
                style={{ cursor: 'pointer' }}
                onClick={() => setEditing(true)}
                title="Click to rename"
                ellipsis
            >
                {toDisplay(props.col)}
            </Typography.Text>
            <DeleteDataButton
                index={props.colIndex}
                type="column"
                confirmDelete={props.confirmDelete}
                onDelete={props.onDelete}
            />
        </Space>
    );
};

export default EditableColumnHeader;