import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DataDeleteButtonProps {
    index: number;
    type: 'record' | 'column';
    confirmDelete: boolean;
    onDelete: (rowIndex: number) => void;
}

const DataDeleteButton: React.FC<DataDeleteButtonProps> = (props) => {
    // Logic to handle delete with confirmation
    const handleClick = () => {
        if (props.confirmDelete) {
            Modal.confirm({
                title: 'Are you sure?',
                content: `Do you really want to delete this ${props.type}?`,
                okText: 'Delete',
                okButtonProps: { danger: true, type: 'default' },
                cancelText: 'Cancel',
                onOk: () => props.onDelete(props.index),
            });
        } else {
            props.onDelete(props.index);
        }
    };

    return (
        <Button danger size="small" onClick={handleClick} title={"Delete " + props.type}>
            <DeleteOutlined />
        </Button>
    );
};

export default DataDeleteButton;