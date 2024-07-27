"use client";
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postDeadline, getDeadline, updateDeadline } from '@/lib/deadline';
import { DeadlineResponse, failureResponse } from '@/types';
import { useAuthContext } from '@/hooks/useAuthContext';


const Deadline = () => {

    const { curDeadline } = useAuthContext();
    console.log("curdeadline ", typeof(curDeadline?.deadline));  
    let curDeadlineDate = null;
    if(curDeadline && 'deadline' in curDeadline) {  
        curDeadlineDate = new Date(curDeadline.deadline);
    }
    const [deadline, setDeadline] = useState<Date>(new Date());
    const [deadlineId, setDeadlineId] = useState<string>('');

    const onClickSetDeadline = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(deadline);
        try {
            console.log("before api call: ");
            const response: DeadlineResponse | failureResponse = await postDeadline(deadline.toISOString());
            console.log("response is: ", response);
            if ('deadline' in response) {
                setDeadline(new Date(response.deadline));
                setDeadlineId(response._id);
                toast.success('Deadline Successfully Set', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.error('Unable to set deadline', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error: any) {
            toast.error(`${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error.message);
        }

    }

    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const date = new Date(e.target.value);
        console.log(e.target.value);
        console.log(typeof (e.target.value));
        const date = new Date(e.target.value);
        if (date < new Date()) {
            toast.error('Deadline cannot be set to a past date', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setDeadline(date);
    }


    return (
        <div>
            <ToastContainer />
            <div className="flex flex-col justify-center items-start
         m-10">
                <div>
                    <label htmlFor="deadline"
                        className="block text-2xl font-semibold text-gray-700">
                        Deadline
                    </label>
                    <p className='text-slate-500'>Currrent Deadline is :
                        <span className='font-semibold text-lg text-black'>
                            {curDeadlineDate?.toDateString()}
                        </span>
                    </p>
                    <input
                        onChange={onChangeDate}
                        value={deadline.toISOString().split('T')[0]}
                        type="date"
                        id="deadline"
                        className="border border-gray-300 rounded-md p-2 mt-4"
                    />
                </div>
                <div>
                    <button className="text-white py-2 px-4 mt-4 uppercase rounded bg-blue-400 shadow 
                        hover:bg-blue-500 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        onClick={onClickSetDeadline}>
                        Set Deadline
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Deadline
