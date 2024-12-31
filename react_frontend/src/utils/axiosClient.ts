import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.BASE_URL,
    timeout:5000,
    
})