import React, { useState } from 'react';

const Semaphore = () => {
    const [isActive] = useState<boolean>(true);
    return (
        <div className={`semaphore ${isActive? 'green' : 'red'}`}></div>
    );
}

export default Semaphore;