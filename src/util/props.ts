import { ProcessModel } from "models/ProcessModel";
import { PropsWithChildren, ReactNode } from "react";

export type Props = PropsWithChildren<ReactNode>;
export type PropsHandler = {
    handleProcessUpdate: (process: ProcessModel) => void,
    handleTimerUpdate: (timer: number) => void,
    handleStartedProcessUpdate: (isStarted: boolean) => void,
    handleCurrentProcessUpdate: (currentProcess: number) => void,
};

export type PropsTable = Props & {
    processList: ProcessModel[],
    lockedProcessList: ProcessModel[],
    handleCurrentProcessUpdate: (currentProcess: number) => void,
}

export type PropsGantt = PropsTable & {
    timer: number,
}

export type PropsHandlerComponent = Props & PropsHandler;

export type PropsLocked = Props & {
    handleLockedProcessUpdate: (process: ProcessModel) => void,
}