import { ProcessInputModel, ProcessModel } from 'models/ProcessModel';
import { createContext } from 'react';

export const computedProcess: ProcessModel[] = [
    new ProcessModel(
        new ProcessInputModel('Python', 0, 10)
    ),
    new ProcessModel(
        new ProcessInputModel('Java', 0, 5)
    ),
    new ProcessModel(
        new ProcessInputModel('Bash', 2, 6)
    ),
    new ProcessModel(
        new ProcessInputModel('A', 5, 5)
    ),
    new ProcessModel(
        new ProcessInputModel('B', 0, 5)
    ),
    new ProcessModel(
        new ProcessInputModel('C', 4, 5)
    ),
];


export const ComputedProcessContext = createContext(computedProcess);