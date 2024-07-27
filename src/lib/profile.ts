import axios from 'axios';
import { User } from '@/types';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async () : Promise<User> => {
    
    const token = localStorage.getItem('token');
    const response : any = await axios.get(`${url}/profile/`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}