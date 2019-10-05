import axios from 'axios';
export const baseUrl = 'http://192.168.0.104:8000';
const baseService = axios.create({
    baseURL:baseUrl
});
export default baseService;
