"use client";
import React from 'react'
import { Paper } from '@/types'
import { useRouter, usePathname } from 'next/navigation'
// import pdfImage from '@/assets/pdfImage.jpg'
import pdfImage from '@/assets/paperImage.jpg'
import Image from 'next/image';

const PaperCard = ({ paper }: { paper: Paper }) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div onClick={() => {router.push(`${pathname}/${paper._id}`)}}
         className="xl:w-1/4 md:w-1/2 p-4
                            hover:-translate-y-1 transition ease-in-out duration-100
                            hover:cursor-pointer hover:shadow-md">
            <div className="bg-gray-100 p-6 rounded-lg">
                <Image src={pdfImage} alt="pdf" className='h-40 rounded w-full object-cover object-center mb-6' width={200} height={200} />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 
                hover:underline hover:text-blue-500 transition ease-in-out duration-100" 
                >
                    {paper.title}
                </h2>
                <p className="leading-relaxed text-base">{`${paper.description.substring(0, 35)}...`}</p>
                <p className={`leading-relaxed text-lg font-semibold `}>{paper.status}</p>
            </div>
        </div>
    )
}

export default PaperCard
