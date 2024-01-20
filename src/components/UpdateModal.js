import {Col, Form, Modal, Row} from "antd";
import React, {useState} from "react";
import '../assets/style/Modal.css'
import {drugDetailCriteria} from "../assets/utils/tableColumns";
import {generateInputFormItem, generateObjectFromForm} from "../assets/utils/generateItems";
import moment from "moment";
import {showConfirm} from "./ConfirmModal";

export const UpdateModal = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen || false);

    const hasNullOrEmptyValues = (newRecord) => Object.values(newRecord).some(
        (value) => value === null || value === "" || value === 0
    );

    const confirmToUpdate = () => {
        const newRecord = {productId: props.recordBeforeUpdate.productId, ...generateObjectFromForm(form)};
        props.recordToUpdate(newRecord);

        if (!hasNullOrEmptyValues(newRecord)) {
            props.showSuccessModal(true);
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    }

    const handleOk = async () => {
        try {
            await showConfirm("Are you sure you want to proceed with your changes?")
            props.isModalOpenCancel(false)
            confirmToUpdate()
        } catch (_) {
            props.isModalOpenCancel(true)
        }
    };

    const handleCancel = async () => {
        try {
            await showConfirm("Your changes won't be saved, are you sure you want to exit?")
            props.isModalOpenCancel(false)
        } catch (_) {
            props.isModalOpenCancel(true)
        }
    };

    const initialValues = {
        ...props.recordBeforeUpdate,
        expiryDate: moment(new Date(props.recordBeforeUpdate.expiryDate)),
    };

    return (
        <Modal
            title="Update Information"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{className: 'update-modal-ok-button'}}
        >
            <p>Please supplement the information you wish to change below, thank you!</p>
            <hr className='py-3'/>
            <Form
                form={form}
                name="updateDrugDetails"
                initialValues={initialValues}
            >
                {drugDetailCriteria.map(criteria => (
                    <Row key={criteria.name}>
                        <Col className='w-[145px]'><label>{criteria.label}</label></Col>
                        <Col className='w-[300px]'>
                            <Form.Item name={criteria.name} className='!form-label'>
                                {generateInputFormItem(criteria, true)}
                            </Form.Item>
                        </Col>
                    </Row>
                ))}
            </Form>
        </Modal>
    );
};