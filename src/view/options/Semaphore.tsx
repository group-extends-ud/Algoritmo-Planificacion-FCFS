import React, { useState } from 'react';

const Semaphore = () => {
    const [isActive, setActive] = useState<boolean>(true);
    return (
        <div className={`semaphore ${isActive? 'green' : 'red'}`}></div>
    );
}

export default Semaphore;