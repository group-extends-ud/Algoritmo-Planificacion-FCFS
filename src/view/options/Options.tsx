import React from "react";
import { PropsHandler } from "util/props";
import './options.css';
import ProcessSettings from "./ProcessSettings";
import Semaphore from "./Semaphore";

const Options = (
    {   handleProcessUpdate, 
        handleTimerUpdate, 
        handleStartedProcessUpdate, 
        handleCurrentProcessUpdate,
        handleLockedProcessUpdate
    }: PropsHandler) => (
    <div className='bottom'>
        <Semaphore />
        <hr></hr>
        <ProcessSettings
            handleTimerUpdate={handleTimerUpdate}
            handleProcessUpdate={handleProcessUpdate}
            handleStartedProcessUpdate={handleStartedProcessUpdate}
            handleCurrentProcessUpdate={handleCurrentProcessUpdate}
            handleLockedProcessUpdate={handleLockedProcessUpdate}
        />
    </div>
);

export default Options;