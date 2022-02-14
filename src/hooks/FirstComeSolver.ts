import { useContext, useState } from 'react';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandler } from 'util/props';
import { StartedProcessContext } from 'context/StartedProcess';
import { TimingContext } from 'context/TimingContext';

export const usePlanificationSolver = ({ handleProcessUpdate, handleStartedProcessUpdate }: PropsHandler): void => {
    const processList = useContext(ComputedProcessContext);
    const isStarted = useContext(StartedProcessContext);
    const timer = useContext(TimingContext);

    const [currentProcess, setCurrentProcess] = useState(0);

    if (isStarted) {
        const process = processList.at(currentProcess);
        if (process && currentProcess < processList.length) {
            if (process.StartTime === -1) {
                if (currentProcess === 0) {
                    process.StartTime = process.CommingTime;
                } else {
                    const lastProcess = processList.at(currentProcess - 1);
                    if (lastProcess) {
                        process.StartTime = Math.max(process.CommingTime, lastProcess.EndTime);
                    }
                }
                process.EndTime = process.StartTime + process.BurstTime;
                process.TurnAroundTime = process.EndTime - process.CommingTime;
                process.WaitingTime = process.TurnAroundTime - process.BurstTime;
                handleStartedProcessUpdate(false);
                handleProcessUpdate(process);
            } else {
                setTimeout(() => {
                    setCurrentProcess(currentProcess + 1);
                    handleStartedProcessUpdate(true);
                }, timer * 1000);
            }
        }
    }
}