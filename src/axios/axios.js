import axios from "axios";

const globalAxios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_BASE_URL,
        "Access-Control-Allow-Credentials": true
    }
});

export default globalAxios