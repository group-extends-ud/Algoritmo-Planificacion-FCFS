import { ProcessModel } from "models/ProcessModel";
import { PropsWithChildren, ReactNode } from "react";

export type Props = PropsWithChildren<ReactNode>;

export type PropsTable = Props & {
    process: ProcessModel[]
}

export type PropsHandler = Props & {
    handleProcessUpdate: (process: ProcessModel) => void
}