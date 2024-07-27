import React from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import PaperCard from '@/components/PaperCard'
import Link from 'next/link'

const Papers = () => {
    const { papers } = useAuthContext();
    // const updatedPapers = papers.filter(paper => paper.status === "PENDING");
    const pendingPapers = papers.filter(paper => paper.status === "PENDING");
    const acceptedPapers = papers.filter(paper => paper.status === 'ACCEPTED');
    const rejectedPapers = papers.filter(paper => paper.status === 'REJECTED');
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div>
                    <h1 className='text-2xl font-semibold font-sans my-6 ml-5'>Pending Papers</h1>
                    <div className="flex flex-wrap -m-4">
                        {
                            pendingPapers.map(paper => (
                                <PaperCard key={paper._id} paper={paper} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold font-sans my-6 ml-5'>Accepted Papers</h1>
                    <div className="flex flex-wrap -m-4">
                        {
                            acceptedPapers.map(paper => (
                                <PaperCard key={paper._id} paper={paper} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold font-sans my-6 ml-5' >Rejected Papers</h1>
                    <div className="flex flex-wrap -m-4">
                        {
                            rejectedPapers.map(paper => (
                                <PaperCard key={paper._id} paper={paper} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Papers
