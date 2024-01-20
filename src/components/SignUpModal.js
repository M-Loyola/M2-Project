import {Form, Input, Modal} from "antd";
import '../assets/style/Modal.css'
import {generateObjectRegistryDetails} from "../assets/utils/generateItems";
import React, {useState} from "react";
import {showConfirm} from "./ConfirmModal";
import {CancelAlert} from "./CancelAlert";
import {createUserHook} from "../hooks/apiHooks";
import {SuccessModal} from "./SuccessModal";

export const SignUpModal = (props) => {
    const invalidMessage = "Please fill in valid information"
    const userExistMessage = "Username already exists!"

    const [form] = Form.useForm()
    const [isModalOpen] = useState(props.isSignUpModalOpen || false)
    const [cancelAlertVisible, setCancelAlertVisible] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState(invalidMessage)

    const handleCreateUser = async (registerDetails) => {
        try {
            const hasCreated = await createUserHook(registerDetails)
            if (hasCreated.data) {
                setIsSuccessModalOpen(true);
            } else {
                setAlertMessage(userExistMessage)
                setCancelAlertVisible(true);
            }
        } catch (error) {
            setAlertMessage(invalidMessage)
            setCancelAlertVisible(true);
        }
    }

    const handleOk = async () => {
        form.validateFields().then(async () => {
            const registerDetails = generateObjectRegistryDetails(form)
            await handleCreateUser(registerDetails);
        }).catch(() => {
            setAlertMessage(invalidMessage)
            setCancelAlertVisible(true);
        });
    }

    const handleCancel = async () => {
        try {
            await showConfirm("Your changes won't be saved, are you sure you want to exit?")
            props.showSignUpModal(false)
        } catch (_) {
            props.showSignUpModal(true)
        }
    }

    return <Modal
        title="CREATE AN ACCOUNT"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Register Account"
        okButtonProps={{className: 'update-modal-ok-button'}}
    >
        <Form
            form={form}
            name="signUp"
        >
            <label className="font-bold text-xl">SIGN UP AND BECOME A FELLOW DRUGGIE</label>
            <hr/>
            <br/>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input a password',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (value.length < 8) {
                                return Promise.reject(new Error('Password length must be at least 8 characters'));
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Password does not match'));
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>
        </Form>
        {cancelAlertVisible && (
            <CancelAlert
                message={"Please fill in valid information"}
                showCancelAlert={(status) => setCancelAlertVisible(status)}
            />
        )}
        {isSuccessModalOpen && (
            <SuccessModal
                isModalOpen={isSuccessModalOpen}
                isModalOpenCancel={(status) => {
                    setIsSuccessModalOpen(status)
                    props.showSignUpModal(status)
                }}
                message={"Successfully Registered Account!"}
            />
        )}
        {cancelAlertVisible && (
            <CancelAlert
                message={alertMessage}
                showCancelAlert={(status) => setCancelAlertVisible(status)}
            />
        )}
    </Modal>
}