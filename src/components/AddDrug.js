import React, {useState} from 'react';
import '../index.css';
import {Button, Col, Form, Row} from 'antd';
import {drugDetailCriteria} from "../assets/utils/tableColumns";
import {createDrugHook, fetchAllDrugs} from "../hooks/apiHooks";
import {generateInputFormItem, generateObjectFromForm} from "../assets/utils/generateItems";
import {SuccessModal} from "./SuccessModal";
import {CancelAlert} from "./CancelAlert";
import {showConfirm} from "./ConfirmModal";

const AddDrug = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cancelAlertVisible, setCancelAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Please fill in valid information")
    const addDrugToInventory = async () => {
        const productDetails = generateObjectFromForm(form)
        try {
            await showConfirm("Do you wish to proceed with adding this drug to the list?").then(async () => {
                if (productDetails.quantityOnHand < 1 || productDetails.unitPrice < 1) {
                    setAlertMessage("Cannot input negative values, please change")
                    setCancelAlertVisible(true)
                } else if (productDetails.productName === "") {
                    setAlertMessage("Cannot input empty in product name, please change")
                    setCancelAlertVisible(true)
                } else {
                    await createDrugHook(productDetails).then(async () => {
                        setCancelAlertVisible(false)
                        await fetchAllDrugs()
                        setIsModalOpen(true)
                        handleReset()
                        props.status(!props.defaultStatus)
                    }).catch(() => {
                        setAlertMessage("Invalid input, please check")
                        setCancelAlertVisible(true)
                    })
                }
            }).catch(() => {
                setAlertMessage("Action Cancelled")
                setCancelAlertVisible(true)
            })
        } catch (error) {
            setAlertMessage("Please fill in valid information")
            setCancelAlertVisible(true)
        }
    };

    const handleReset = () => {
        form.resetFields();
    }

    return (
        <div className='p-4'>
            <div className='search-border'>
                <p className='search-title'>Add To Inventory</p>
                <hr/>
                <div className='p-4 overflow-hidden'>
                    <Form
                        form={form}
                        name="addDrugDetails"
                        layout='vertical'
                        initialValues={{
                            category: 'Over the counter'
                        }}
                    >
                        <Row gutter={16}>
                            {drugDetailCriteria.map(criteria => (
                                <Col className='w-1/5 h-[78px]' key={criteria.name}>
                                    <Form.Item label={criteria.label} name={criteria.name} className='!form-label'>
                                        {generateInputFormItem(criteria)}
                                    </Form.Item>
                                </Col>
                            ))}
                        </Row>
                        <Row gutter={16} className='!float-right'>
                            <Col className='h-[32px]'>
                                <Form.Item>
                                    <Button className='btn-reset' onClick={handleReset}>Reset</Button>
                                </Form.Item>
                            </Col>
                            <Col className='h-[32px]'>
                                <Form.Item>
                                    <Button className='btn-search' onClick={addDrugToInventory}>Add</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            {isModalOpen && (
                <SuccessModal
                    isModalOpen={isModalOpen}
                    isModalOpenCancel={(status) => setIsModalOpen(status)}
                    message={"Successfully Added Drug to Inventory!"}
                />
            )}
            {cancelAlertVisible && (
                <CancelAlert
                    message={alertMessage}
                    showCancelAlert={(status) => setCancelAlertVisible(status)}
                />
            )}
        </div>
    )
}

export default AddDrug