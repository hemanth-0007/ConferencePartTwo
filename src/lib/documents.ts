
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllDocuments = async (paperId : string): Promise<any> => {
    const token = localStorage.getItem('token');

    const response: any = await axios.get(`${url}/doc/all/${paperId}`, {
        headers: {
            'Content-Type': 'application/pdf',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    console.log(response.data);
    return response.data;
}