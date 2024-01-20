import React, {useState} from 'react'
import {Button, Col, Modal, Row} from "antd";
import prescriptionImg from '../assets/images/prescription-img.png';
import otcImg from '../assets/images/over-the-counter-img.png';
export const DetailsModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen || false);
    const handleOk = () => {
        props.isModalOpenCancel(false);
        setIsModalOpen(false);
    }

    const showImageCategory = (category) => {
        if (category === "Prescription") {
            return <>
                <img className="w-[300px] h-[300px] m-auto" src={prescriptionImg} alt="Prescription" />
                <p className="font-bold">Note: Make sure to get the prescription before handing out the drugs</p>
            </>
        } else {
            return <>
                <img className="w-[300px] h-[300px] m-auto" src={otcImg} alt="OTC" />
                <p className="font-bold">Note: Anyone can purchase drugs if it's labeled as Over the counter</p>
            </>
        }
    }

    return <Modal
        title="RECORD DETAILS"
        open={isModalOpen}
        closable={false}
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
        {showImageCategory(props.record.category)}
        <Row>
            <Col className="bg-slate-700 text-[#ffffff] w-[200px] px-4 py-1 mt-4">Product Name</Col>
            <Col className="px-4 py-1 mt-4">{props.record.productName}</Col>
        </Row>
        <Row>
            <Col className="bg-slate-700 text-[#ffffff] w-[200px] px-4 py-1 mt-2">Category</Col>
            <Col className="px-4 py-1 mt-2">{props.record.category}</Col>
        </Row>
        <Row>
            <Col className="bg-slate-700 text-[#ffffff] w-[200px] px-4 py-1 mt-2">Quantity On Hand</Col>
            <Col className="px-4 py-1 mt-2">{props.record.quantityOnHand}</Col>
        </Row>
        <Row>
            <Col className="bg-slate-700 text-[#ffffff] w-[200px] px-4 py-1 mt-2">Expiry Date</Col>
            <Col className="px-4 py-1 mt-2">{props.record.expiryDate}</Col>
        </Row>
        <Row>
            <Col className="bg-slate-700 text-[#ffffff] w-[200px] px-4 py-1 mt-2">Unit Price</Col>
            <Col className="px-4 py-1 mt-2">{props.record.productName}</Col>
        </Row>
    </Modal>
}