import React from "react";
import { PropsHandler } from "util/props";
import './options.css';
import ProcessSettings from "./ProcessSettings";
import Semaphore from "./Semaphore";

const Options = ({ handleProcessUpdate }: PropsHandler) => (
    <div className='bottom'>
        <Semaphore />
        <hr></hr>
        <ProcessSettings handleProcessUpdate={handleProcessUpdate} />
    </div>
);

export default Options;