import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteDataButtonProps {
    index: number;
    type: 'record' | 'column';
    confirmDelete: boolean;
    onDelete: (rowIndex: number) => void;
}

const DeleteDataButton: React.FC<DeleteDataButtonProps> = ({ index, type, confirmDelete, onDelete }: DeleteDataButtonProps) => {
    // Logic to handle delete with confirmation
    const handleClick = () => {
        if (confirmDelete) {
            Modal.confirm({
                title: 'Are you sure?',
                content: `Do you really want to delete this ${type}?`,
                okText: 'Delete',
                okButtonProps: { danger: true },
                cancelText: 'Cancel',
                onOk: () => onDelete(index),
            });
        } else {
            onDelete(index);
        }
    };

    return (
        <Button danger size="small" onClick={handleClick} title={"Delete " + type}>
            <DeleteOutlined />
        </Button>
    );
};

export default DeleteDataButton;