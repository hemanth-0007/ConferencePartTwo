import { loginRequest, loginResponse, failureResponse } from "@/types";
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getToken = async (data : loginRequest): Promise<loginResponse | failureResponse> =>
{
    const response : any = await axios.post<loginResponse>(`${url}/login/`, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

 