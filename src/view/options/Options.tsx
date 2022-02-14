import React from "react";
import { PropsHandler } from "util/props";
import './options.css';
import ProcessSettings from "./ProcessSettings";
import Semaphore from "./Semaphore";

const Options = ({ handleProcessUpdate, handleTimerUpdate, handleStartedProcessUpdate }: PropsHandler) => (
    <div className='bottom'>
        <Semaphore />
        <hr></hr>
        <ProcessSettings handleTimerUpdate={handleTimerUpdate} handleProcessUpdate={handleProcessUpdate} handleStartedProcessUpdate={handleStartedProcessUpdate} />
    </div>
);

export default Options;