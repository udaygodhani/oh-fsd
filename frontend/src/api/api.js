import axios from 'axios';
const baseurl = import.meta.env.VITE_BASE_URL || "http://localhost:8000"
const api = axios.create({
    baseURL: baseurl,
    withCredentials: true
})

export default api