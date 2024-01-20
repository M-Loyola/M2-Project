import {Button, Modal} from "antd";
import {useState} from "react";
import '../assets/style/Modal.css'

export const SuccessModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen || false);
    const handleOk = () => {
        props.isModalOpenCancel(false);
        setIsModalOpen(false);
    }

    return <Modal
        title="Action Success"
        open={isModalOpen}
        footer={[
            <Button
                key="ok"
                type="primary"
                className="update-modal-ok-button"
                onClick={handleOk}
            >
                OK
            </Button>,
        ]}
    >
        <p>{props.message}</p>
    </Modal>
};