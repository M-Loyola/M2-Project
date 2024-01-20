import React, {useContext, useState} from "react";
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {CancelAlert} from "./CancelAlert";
import {getUserByUsernameHook} from "../hooks/apiHooks";
import {SignUpModal} from "./SignUpModal";
import {MyContext} from "../global/MyProvider";

export const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [cancelAlertVisible, setCancelAlertVisible] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const { setCurrentUserLoggedIn } = useContext(MyContext);

    function handleNavigation(response, username, password) {
        const userExists = response.data.username === username && response.data.password === password
        if (userExists) {
            setCurrentUserLoggedIn(username)
            navigate("/dashboardPage");
        } else {
            onFinishFailed()
        }
    }

    const onFinish = async () => {
        const username = form.getFieldValue("username");
        const password = form.getFieldValue("password");
        const response =  await getUserByUsernameHook(username)
        handleNavigation(response, username, password);
    }

    const onFinishFailed = () => {
        setCancelAlertVisible(true)
    }

    return (
        <Form
            name="login"
            form={form}
            className="mx-[150px] px-[50px] py-[50px] bg-white w-[400px] rounded-lg"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <label className="font-bold text-xl">WELCOME TO DRUGGIES</label>
            <hr/>
            <br/>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
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
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button className="w-[300px]" htmlType="submit">
                    Login
                </Button>
                <p className="pt-1">
                    Not registered yet? <a onClick={()=>setShowSignUpModal(true)}className="text-slate-500 font-bold">Create an account</a>
                </p>
            </Form.Item>
            {cancelAlertVisible && (
                <CancelAlert
                    message={"Invalid username/password"}
                    showCancelAlert={(status) => setCancelAlertVisible(status)}
                />
            )}
            {showSignUpModal &&
                <SignUpModal
                    isSignUpModalOpen={showSignUpModal}
                    showSignUpModal={(status)=>{setShowSignUpModal(status)}}
                />
            }
        </Form>
    );
}
