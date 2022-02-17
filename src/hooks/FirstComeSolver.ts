import { useContext } from 'react';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandler } from 'util/props';
import { StartedProcessContext } from 'context/StartedProcess';
import { TimingContext } from 'context/TimingContext';
import { getLastExecutedProcess } from 'util/processUtil';
import { LockProcessContext } from 'context/LockContext';
import { CurrentProcessContext } from 'context/CurrentProcessContext';

export const usePlanificationSolver = (
    {   handleProcessUpdate, 
        handleStartedProcessUpdate, 
        handleCurrentProcessUpdate
    }: PropsHandler): void => {

    const processList = useContext(ComputedProcessContext);
    const queueBlockedProcess = useContext(LockProcessContext);
    const isStarted = useContext(StartedProcessContext);
    const timer = useContext(TimingContext);
    const currentProcess = useContext(CurrentProcessContext);

    const TIMEOUT = timer * 1000;

    if (isStarted) {
        const process = processList.at(currentProcess);
        if (process && currentProcess < processList.length) {
            if(!queueBlockedProcess.includes(process)) {
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
                    setTimeout(() => {
                        handleStartedProcessUpdate(false);
                        handleProcessUpdate(process);
                    },TIMEOUT);
                } else {
                    setTimeout(() => {
                        handleCurrentProcessUpdate(currentProcess + 1);
                        handleStartedProcessUpdate(true);
                    },TIMEOUT);
                }
            }
        } else {
            handleStartedProcessUpdate(false);
        }
    }
}