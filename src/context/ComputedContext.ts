import { ProcessInputModel, ProcessModel } from 'models/ProcessModel';
import { createContext } from 'react';

export const computedProcess: ProcessModel[] = [
    new ProcessModel(
        new ProcessInputModel('Python', 0, 10)
    ),
    new ProcessModel(
        new ProcessInputModel('Java', 0, 5)
    ),
];


export const ComputedProcessContext = createContext(computedProcess);