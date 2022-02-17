import { ProcessModel,ProcessInputModel } from 'models/ProcessModel';
import { createContext } from 'react';

export const computedProcess: ProcessModel[] = [
    new ProcessModel(new ProcessInputModel('Bash',0,5)),
    new ProcessModel(new ProcessInputModel('B',0,2)),
    new ProcessModel(new ProcessInputModel('C',0,6)),
];

export const ComputedProcessContext = createContext(computedProcess);