import { createContext } from 'react';

export const queueLockedProcess:any = [];


export const LockProcessContext = createContext(queueLockedProcess);