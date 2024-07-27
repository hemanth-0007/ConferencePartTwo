"use client";

import React from 'react'
import { useParams } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';
import DetailedPaper from '@/components/DetailedPaper';


const PaperIdPage = () => {

    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <DetailedPaper />
        </div>
    )
}

export default PaperIdPage
