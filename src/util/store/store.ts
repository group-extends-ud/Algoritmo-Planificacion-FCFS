import { configureStore } from '@reduxjs/toolkit';
import algorithmStatus from './algorithmStatus';

import computedProcess from './computedProcess';
import currentProcess from './currentProcess';
import queueBlockedProcess from './queueBlockedProcess';
import timer from './timer';


export const store = configureStore({
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }),
    reducer:{
        computedProcess,
        currentProcess,
        timer,
        algorithmStatus,
        queueBlockedProcess,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;