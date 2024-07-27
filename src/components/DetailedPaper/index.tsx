"use client";
import React, { useEffect, useState } from 'react'
import { Paper, Reviewer, successResponse } from '@/types'
import { useAuthContext } from '@/hooks/useAuthContext';
import { usePathname } from 'next/navigation';
import styles from './DetailedPaper.module.css';
import { acceptPaper, rejectPaper } from '@/lib/paper';
import { getAllDocuments } from '@/lib/documents';

import { GoDotFill } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DetailedPaper = () => {

    const { reviewers, papers } = useAuthContext();
    const pathname = usePathname();
    const paperId = pathname.split('/')[pathname.split('/').length - 1];
    // console.log(paperId);
    const fetchedPaper: Paper | undefined = papers.find(paper => paper._id == paperId);

    const [paper, setPaper] = useState<Paper | undefined>(fetchedPaper);
    const [curReviewers, setCurReviewers] = useState<Reviewer[]>([]);




    useEffect(() => {
        const fetchDocs = async () => {
            const docs = await getAllDocuments(paperId);
            // console.log(docs);
        }
        fetchDocs();
    }, []);

    const onClickAcceptPaper = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (paper?.status === 'PENDING') {
            console.log('Paper Not Reviewed Yet');
            try {
                const response: successResponse = await acceptPaper(paperId);
                const { message } = response;
                console.log(message);
                setPaper(prev => ({ ...prev!, status: 'ACCEPTED' }));
                toast.success('Paper Successfully Accepted', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error: any) {
                console.log(error.message);
            }
        }
        else{
            toast.error('Paper is ACCEPTED or REJECTED', {
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
        return;
    }

    const onClickRejectPaper = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (paper?.status === 'PENDING') {
            console.log('Paper Not Reviewed Yet');
            try {
                const response: successResponse = await rejectPaper(paperId);
                const { message } = response;
                console.log(message);
                setPaper(prev => ({ ...prev!, status: 'REJECTED' }));
                toast.error('Paper Successfully Rejected', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error: any) {
                console.log(error.message);
            }
        }
        else{
            toast.error('Paper is ACCEPTED or REJECTED', {
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
        return;
    }

    const cardClass = () =>{
        if(paper?.status === 'ACCEPTED'){
            return `${styles.status_card} bg-green-200`;
        }
        if(paper?.status === 'REJECTED'){
            return `${styles.status_card} bg-red-200`;
        }
        if(paper?.status === 'PENDING')
            return `${styles.status_card} bg-slate-200`;
    }



    return (
        <section className="text-gray-600 body-font ml-5">
            <ToastContainer/>
            <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {paper?.title}
                    </h1>
                    <p className="mb-8 leading-relaxed text-lg font-sans">{paper?.description}</p>
                    <div className={cardClass()}>
                        {paper?.status === 'ACCEPTED' && <div className='flex flex-row justify-between items-center'><GoDotFill className='text-green-700 mx-2 text-xl' /><p className='text-xl font-semibold'>{paper?.status}</p></div>}
                        {paper?.status === 'PENDING' && <div className='flex flex-row justify-between items-center'><GoDotFill className='text-slate-600 mx-2 text-xl' /><p className='text-xl font-semibold'>{paper?.status}</p></div>}
                        {paper?.status === 'REJECTED' && <div className='flex flex-row justify-between items-center'><GoDotFill className='text-red-600 mx-2 text-xl' /><p className='text-xl font-semibold'>{paper?.status}</p></div>}
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <h1 className='text-xl font-semibold font-sans 
                        text-black'>Reviewers List
                            <span>
                                {/* {curReviewers}/{reviewers.length} */}
                                {` (${curReviewers.length} /${3})`}
                            </span>
                        </h1>
                        <ul className='my-3 flex flex-row justify-start items-start flex-wrap
                         w-[50vw]'>
                            {reviewers.map(reviewer => {
                                const onClickReviewerItem = (e: React.MouseEvent<HTMLLIElement>) => {
                                    for (let i = 0; i < curReviewers.length; i++) {
                                        if (curReviewers[i]._id == reviewer._id) {
                                            setCurReviewers(prev => prev.filter(r => r._id !== reviewer._id));
                                            return;
                                        }
                                    }
                                    if (curReviewers.length < 3) {
                                        setCurReviewers(prev => ([...prev, reviewer]));
                                    }
                                }
                                const isActive: boolean = curReviewers.some(r => r._id === reviewer._id);
                                return (
                                    <li key={reviewer._id}
                                        className='list-none cursor-pointer
                                         border-gray-300 rounded-lg p-2 m-2 '
                                        onClick={onClickReviewerItem}>
                                        <div className={isActive ? styles.active_list_item : styles.list_item}>
                                            <p className='text-xl font-semibold'>
                                                {`${reviewer.firstname} ${reviewer.lastname}`}
                                            </p>
                                            <p>
                                                {`${reviewer.expert_at.join(',')}`}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <button className={curReviewers.length !== 3 ? styles.btn_disabled : styles.btn}
                            onClick={() => {
                                console.log(curReviewers);
                            }}
                            disabled={curReviewers.length !== 3}
                        >
                            Assign Reviewers
                        </button>
                        <button onClick={onClickAcceptPaper} className={styles.btn}>
                            Accept Paper
                        </button>
                        <button onClick={onClickRejectPaper} className={styles.btn}>
                            Reject Paper
                        </button>
                    </div>




                </div>
                <div className="documents border-2 w-[50vw] h-[70vh]">
                    {/* <h1>Hello</h1> */}
                </div>
            </div>
        </section>
    )
}

export default DetailedPaper
