import {ExclamationCircleFilled} from "@ant-design/icons";
import {Modal} from "antd";

export const showConfirm = (message) => {
    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: message,
            icon: <ExclamationCircleFilled />,
            onOk() {
                resolve();
            },
            onCancel() {
                reject();
            },
            okButtonProps: {
                className: 'confirm-modal-ok-button',
            },
        });
    });
};