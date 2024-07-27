
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <TailSpin
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    );
}

export default Loading;
