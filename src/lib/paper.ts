"use client";

import { successResponse } from '@/types';
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;


export const acceptPaper = async (paperId: string): Promise<successResponse> => {
    const token = localStorage.getItem('token');

    const response: any = await axios.post(`${url}/accept/${paperId}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}


export const rejectPaper = async (paperId: string): Promise<successResponse> => {
    const token = localStorage.getItem('token');

    const response: any = await axios.post(`${url}/reject/${paperId}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const setBackToPending = async (paperId: string): Promise<successResponse> => {
    const token = localStorage.getItem('token');

    const response: any = await axios.post(`${url}/pending/${paperId}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const getAllPapers = async (): Promise<any> => {
    const token = localStorage.getItem('token');

    const response: any = await axios.get(`${url}/get-papers/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response.data;
}

 