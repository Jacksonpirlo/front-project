import axios from "axios"
import dotenv from "dotenv";
dotenv.config();

const API: any = process.env.API_BACK
export const getUsers = () => {
    const res = axios.get(API)
    console.log(res);
}