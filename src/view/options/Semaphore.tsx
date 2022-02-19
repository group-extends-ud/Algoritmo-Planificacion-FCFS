import { useAppSelector } from 'hooks/redux';
import React from 'react';

const Semaphore = () => {
    const algorithmStatus = useAppSelector(({ algorithmStatus: { value } }) => value );
    return (
        <div className={`semaphore ${!algorithmStatus? 'green' : 'red'}`}></div>
    );
}

export default Semaphore;