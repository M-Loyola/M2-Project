import axios from "axios";

const LOCAL_BASE_URL = "http://localhost:8080/";

export const api = axios.create(
    {
        dev: {
            baseURL: LOCAL_BASE_URL,
        },
    }[process.env.REACT_APP_ENV || "dev"]
);
export default api;