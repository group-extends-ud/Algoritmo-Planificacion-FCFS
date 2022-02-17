import { StartedProcessContext } from 'context/StartedProcess';
import React, { useContext } from 'react';

const Semaphore = () => {
    const isStarted = useContext(StartedProcessContext);
    return (
        <div className={`semaphore ${!isStarted? 'green' : 'red'}`}></div>
    );
}

export default Semaphore;