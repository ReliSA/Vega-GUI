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

const EditableColumnHeader: React.FC<EditableColumnHeaderProps> = ({ col, colIndex, onRename, onDelete, confirmDelete }: EditableColumnHeaderProps) => {
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState(col);
    const save = () => {
        setEditing(false);
        if (inputVal && inputVal !== col) onRename(inputVal);
    };
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
                    index={colIndex}
                    type='column'
                    confirmDelete={confirmDelete}
                    onDelete={onDelete}
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
                {toDisplay(col)}
            </Typography.Text>
            <DeleteDataButton
                index={colIndex}
                type="column"
                confirmDelete={confirmDelete}
                onDelete={onDelete}
            />
        </Space>
    );
};

export default EditableColumnHeader;