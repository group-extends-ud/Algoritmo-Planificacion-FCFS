import { useCallback, useEffect, useState } from 'react';
import { getLastExecutedProcess } from 'util/processUtil';
import { setAlgorithmStatus } from 'util/store/algorithmStatus';
import { addProcess, updateProcess } from 'util/store/computedProcess';
import { incrementExecuted, resetExecuted, setCurrentProcess } from 'util/store/currentProcess';
import { updateWaitingTime, removeElement } from 'util/store/queueBlockedProcess';
import { useAppSelector, useAppDispatch } from './redux';

export const useFCFSSolver = (): void => {

    console.log("Algoritmo FCFS");

    const processList = useAppSelector(({ computedProcess: { value } }) => value);
    const { currentProcess, executed } = useAppSelector(({ currentProcess: { value } }) => value);
    const algorithmStatus = useAppSelector(({ algorithmStatus: { value } }) => value);
    const timer = useAppSelector(({ timer: { value } }) => value);
    const lockedProcess = useAppSelector(({ queueBlockedProcess: { value } }) => value);

    const dispatch = useAppDispatch();

    const [canExecute, setExecuteStatus] = useState(true);

    const TIMEOUT = timer * 1000;

    const nextProcess = useCallback(() => {
        dispatch(
            setAlgorithmStatus(false)
        );
        setTimeout(() => {
            const nextProcessIndex = processList.indexOf(currentProcess!) + 1;

            dispatch(
                resetExecuted()
            );

            dispatch(
                setCurrentProcess(
                    processList.at(nextProcessIndex)
                )
            );
            dispatch(
                setAlgorithmStatus(true)
            );
        }, TIMEOUT);
    }, [TIMEOUT, currentProcess, dispatch, processList]);

    useEffect(() => {
        if (algorithmStatus && canExecute) {
            if (currentProcess) {
                if (currentProcess.EndTime === -1) {
                    const lastProcess = getLastExecutedProcess(processList);
                    if (lastProcess) {
                        currentProcess.StartTime = Math.max(currentProcess.CommingTime, lastProcess.EndTime);
                    } else {
                        currentProcess.StartTime = currentProcess.CommingTime;
                    }
                    currentProcess.Executed = executed;

                    if (executed === currentProcess.BurstTime) {
                        currentProcess.EndTime = currentProcess.StartTime + currentProcess.BurstTime +
                            ((currentProcess.LockedTime !== -1) ? (currentProcess.LockedTime) : (0));
                        currentProcess.TurnAroundTime = currentProcess.EndTime - currentProcess.CommingTime;
                        currentProcess.WaitingTime = (currentProcess.TurnAroundTime - currentProcess.BurstTime);
                    } else {
                        dispatch(
                            incrementExecuted()
                        )
                    }

                    dispatch(
                        updateProcess(
                            currentProcess
                        )
                    );

                    setExecuteStatus(false);
                    setTimeout(() => {
                        setExecuteStatus(true);
                    }, TIMEOUT);
                } else {
                    nextProcess();
                }
            } else {
                dispatch(
                    setAlgorithmStatus(false)
                );
            }
        } else {
            setTimeout(() => {
                lockedProcess.forEach((lockedProcess) => {
                    if (!processList.includes(lockedProcess.processBlocked) && lockedProcess.waiting === 0) {
                        dispatch(
                            addProcess(lockedProcess.processBlocked)
                        );

                        dispatch(
                            removeElement()
                        );

                        if(!currentProcess){
                            const currentIndex = processList.indexOf(lockedProcess.processBlocked);
                            dispatch(
                                setCurrentProcess(
                                    processList.at(currentIndex)
                                )
                            );
                        }
                    } else {
                        dispatch(
                            updateWaitingTime(lockedProcess)
                        );
                    }
                });
            }, TIMEOUT);
        }
    }, [algorithmStatus, currentProcess, processList, dispatch, TIMEOUT, executed, nextProcess, lockedProcess, canExecute]);
}