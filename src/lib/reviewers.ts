"use client";

import { addReviewerRequest, Reviewer , successResponse} from '@/types';
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllReviewers = async (): Promise<Reviewer[]> => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/get-reviewer/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const assignReviewer = async (paperId: string, reviewerId: string): Promise<string> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${url}/assign/${reviewerId}/${paperId}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}


export const addReviewer = async (reviewer: addReviewerRequest): Promise<successResponse> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${url}/add-reviewer/`, reviewer, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

