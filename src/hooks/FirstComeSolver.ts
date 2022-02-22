import { useEffect, useState } from 'react';
import { getLastExecutedProcess } from 'util/processUtil';
import { setAlgorithmStatus } from 'util/store/algorithmStatus';
import { updateProcess } from 'util/store/computedProcess';
import { setCurrentProcess } from 'util/store/currentProcess';
import { useAppSelector, useAppDispatch } from './redux';

export const usePlanificationSolver = (): void => {

    const processList = useAppSelector(({ computedProcess: { value } }) => value);
    const { currentProcess, isBlocked } = useAppSelector(({ currentProcess: { value } }) => value);
    const algorithmStatus = useAppSelector(({ algorithmStatus: { value } }) => value);
    const timer = useAppSelector(({ timer: { value } }) => value);


    const dispatch = useAppDispatch();

    const [waitTimeLocked, setWaitTime] = useState(0);

    const TIMEOUT = timer * 1000;


    useEffect(() => {
        if (algorithmStatus) {
            if (currentProcess) {
                if (!isBlocked) {
                    if (currentProcess.StartTime === -1) {
                        const lastProcess = getLastExecutedProcess(processList);
                        if (lastProcess) {
                            currentProcess.StartTime = Math.max(currentProcess.CommingTime, lastProcess.EndTime);
                        } else {
                            currentProcess.StartTime = currentProcess.CommingTime;
                        }
                        currentProcess.StartTime += waitTimeLocked;
                        currentProcess.EndTime = currentProcess.StartTime + currentProcess.BurstTime;
                        currentProcess.TurnAroundTime = currentProcess.EndTime - currentProcess.CommingTime;
                        currentProcess.WaitingTime = (currentProcess.TurnAroundTime - currentProcess.BurstTime);
                        currentProcess.LockedTime = (waitTimeLocked === 0) ? (-1) : (waitTimeLocked);
                        dispatch(
                            setAlgorithmStatus(
                                false
                            )
                        );
                        dispatch(
                            updateProcess(
                                currentProcess
                            )
                        );
                        setWaitTime(0);
                        setTimeout(() => {
                            dispatch(
                                setAlgorithmStatus(
                                    true
                                )
                            );
                        }, TIMEOUT);
                    } else {
                
                        setTimeout(() => {
                            const nextProcessIndex = processList.indexOf(currentProcess) + 1;
                    
                            dispatch(
                                setCurrentProcess(
                                    processList.at(nextProcessIndex)
                                )
                            );
                            dispatch(
                                setAlgorithmStatus(true)
                            );
                        }, TIMEOUT);
                    }
                } else {
                    setTimeout(() => {
                        setWaitTime(waitTimeLocked + 1);
                    }, TIMEOUT);
                }
            } else {
                dispatch(
                    setAlgorithmStatus(false)
                );
            }
        }
    }, [algorithmStatus, currentProcess, isBlocked, processList, waitTimeLocked, dispatch, TIMEOUT]);
}