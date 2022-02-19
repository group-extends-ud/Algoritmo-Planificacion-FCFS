import React from "react";
import { PropsHandler } from "util/props";
import './options.css';
import ProcessSettings from "./ProcessSettings";
import Semaphore from "./Semaphore";

const Options = () => (
    <div className='bottom'>
        <Semaphore />
        <hr></hr>
        <ProcessSettings />
    </div>
);

export default Options;