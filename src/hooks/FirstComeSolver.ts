import { useContext, useState } from 'react';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandler } from 'util/props';
import { StartedProcessContext } from 'context/StartedProcess';
import { TimingContext } from 'context/TimingContext';
import { LockProcessContext } from 'context/LockContext';

import { getLastExecutedProcess } from 'util/processUtil';

export const usePlanificationSolver = ({ handleProcessUpdate, handleStartedProcessUpdate }: PropsHandler): void => {
    const processList = useContext(ComputedProcessContext);
    const isStarted = useContext(StartedProcessContext);
    const timer = useContext(TimingContext);
    const queueBlocked = useContext(LockProcessContext);

    const [currentProcess, setCurrentProcess] = useState(0);

    if (isStarted) {
        const process = processList.at(currentProcess);
        if (process && currentProcess < processList.length) {
            if (!queueBlocked.includes(process)) {
                if (process.StartTime === -1) {
                    const lastProcess = getLastExecutedProcess(processList);
                    if (lastProcess) {
                        process.StartTime = Math.max(process.CommingTime, lastProcess.EndTime);
                    } else {
                        process.StartTime = process.CommingTime;
                    }
                    process.EndTime = process.StartTime + process.BurstTime;
                    process.TurnAroundTime = process.EndTime - process.CommingTime;
                    process.WaitingTime = process.TurnAroundTime - process.BurstTime;
                    handleStartedProcessUpdate(false);
                    handleProcessUpdate(process);
                } else {
                    setTimeout(() => {
                        //debugger;
                        setCurrentProcess(currentProcess + 1);
                        handleStartedProcessUpdate(true);
                    }, timer * 1000);
                }
            } else {
                setCurrentProcess(currentProcess + 1);
            }
        } else {
            handleStartedProcessUpdate(false);
        }
    }
}