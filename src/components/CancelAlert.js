import { Alert } from "antd";
import { useEffect, useState } from "react";
import '../assets/style/Modal.css';

export const CancelAlert = ({message = "Action Cancelled",showCancelAlert}) => {
    const [alertVisible, setAlertVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            showCancelAlert(false);
            setAlertVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleCloseAlert = () => {
        setAlertVisible(false);
    };

    if (!alertVisible) {
        return null;
    }

    return (
        <div className="alert-cancel">
            <Alert
                type="error"
                message={message}
                closable={true}
                banner
                onClose={handleCloseAlert}
            />
        </div>
    );
};
