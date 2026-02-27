import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

interface DatasetAddButtonProps {
    onAdd: (datasetName: string) => void;
}

const DatasetAddButton: React.FC<DatasetAddButtonProps> = (props) => {
    // State to control the visibility of the modal
    const [visible, setVisible] = useState(false);

    // State to hold the input value for the new dataset name
    const [value, setValue] = useState('');

    // Call the onAdd callback and close the modal
    const handleOk = () => {
        props.onAdd(value);
        setVisible(false);
        setValue('');
    };

    // Close the modal and reset the input value
    const handleCancel = () => {
        setVisible(false);
        setValue('');
    };

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Dataset
            </Button>
            <Modal
                title="Add New Dataset"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Dataset name"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onPressEnter={handleOk}
                    autoFocus
                />
            </Modal>
        </>
    );
};

export default DatasetAddButton;