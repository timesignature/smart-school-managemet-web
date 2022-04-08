import axios from "axios";
import {TOKEN_LABEL, url} from "./config";


axios.defaults.baseURL = `${url}/api`
axios.defaults.timeout=10000000000000
const http = axios.create()
http.interceptors.request.use(
    async config => {
        const token = localStorage.getItem(TOKEN_LABEL)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
export default http
