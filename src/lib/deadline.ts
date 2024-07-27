"use client";

import { DeadlineResponse, failureResponse } from '@/types';
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_API_URL;

export const getDeadline = async (): Promise<DeadlineResponse | failureResponse> => {
    const token = localStorage.getItem('token');
    console.log("get Deadline token: ");
    const response = await axios.get(`${url}/deadline/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
};

// should take a string of a Date object
export const postDeadline = async (deadline: string): Promise<DeadlineResponse | failureResponse> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${url}/deadline/add`, {deadline} , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateDeadline = async (deadlineId: string, deadline : string): Promise<DeadlineResponse | failureResponse> => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${url}/deadline/${deadlineId}`,{deadline} , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};