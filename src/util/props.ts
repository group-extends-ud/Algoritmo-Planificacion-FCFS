import { ProcessModel } from "models/ProcessModel";
import { PropsWithChildren, ReactNode } from "react";

export type Props = PropsWithChildren<ReactNode>;

export type PropsTable = Props & {
    processList: ProcessModel[],
    lockedProcessList: ProcessModel[],
}

export type PropsGantt = PropsTable & {
    timer: number,
}

export type PropsHandler = Props & {
    handleProcessUpdate: (process: ProcessModel) => void,
    handleTimerUpdate: (timer: number) => void,
}

export type PropsLocked = Props & {
    handleLockedProcessUpdate: (process: ProcessModel) => void,
}