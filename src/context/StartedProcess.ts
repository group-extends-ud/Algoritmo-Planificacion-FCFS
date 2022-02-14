import { createContext } from 'react';

export const initialState: boolean = false;


export const StartedProcessContext = createContext(initialState);