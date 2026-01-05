import axios from "axios"
import { Base_URL } from "./ApiPath"
export const axiosInstance=axios.create({
    baseURL:Base_URL,
})