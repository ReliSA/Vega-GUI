import React from 'react';
import { Button, Modal } from 'antd';

interface DatasetDeleteButtonProps {
    datasetName: string;
    onDelete: (datasetName: string) => void;
}

const DatasetDeleteButton: React.FC<DatasetDeleteButtonProps> = (props) => {
    // Show a confirmation before deleting the dataset
    const handleClick = () => {
        Modal.confirm({
            title: `Delete dataset "${props.datasetName}"?`,
            content: 'This will remove the entire dataset and all its data. This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => props.onDelete(props.datasetName),
        });
    };
    
    return (
        <Button danger size="small" onClick={handleClick}>
            Delete
        </Button>
    );
};

export default DatasetDeleteButton;