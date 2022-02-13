import { ProcessModel } from 'models/ProcessModel';
import { createContext } from 'react';

export const queueLockedProcess: ProcessModel[] = [];

export const LockProcessContext = createContext(queueLockedProcess);