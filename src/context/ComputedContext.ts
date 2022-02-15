import { ProcessModel } from 'models/ProcessModel';
import { createContext } from 'react';

export const computedProcess: ProcessModel[] = [];

export const ComputedProcessContext = createContext(computedProcess);