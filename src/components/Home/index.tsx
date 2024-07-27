
import React from 'react';
import conferenceImage from "@/assets/conference.jpg";
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2  p-8">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Conference PC Reviewer</h1>
                <p className="text-lg">
                    This is a platform where you can review papers for conferences. You can see the list of conferences, papers, and reviews.
                </p>
                <div className='flex flex-col md:flex-row justify-start items-center'>
                {/* <button className="text-white py-2 px-4 mt-8 uppercase rounded bg-blue-400 shadow 
                        hover:bg-blue-500 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    Assign Reviewers    
                </button> */}
                <Link href="/home/papers">
                    <button className="text-white mx-2 py-2 px-4 mt-8 uppercase rounded bg-blue-400 shadow 
                            hover:bg-blue-500 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        View Papers  
                    </button>
                </Link>
                </div>
            </div>
            <div className="md:w-1/2">
                <Image src={conferenceImage}
                    width={100} height={100}
                    alt="conferenceImage"
                    layout="responsive"
                    className="rounded-lg border-2" />
            </div>
        </div>
    );
}

export default Home;
