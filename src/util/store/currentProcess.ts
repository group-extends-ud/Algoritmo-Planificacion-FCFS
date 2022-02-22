import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessModel } from "models/ProcessModel";
import { CurrentProcess } from 'util/props';

const currentProcessSlice = createSlice({
    name:'currentProcess',
    initialState:{
        value:{
            isBlocked:false,
            currentProcess:undefined 
        } as CurrentProcess
    },
    reducers:{
        setCurrentProcess(state,{ payload }: PayloadAction<ProcessModel | undefined>){
            state.value.currentProcess = payload;
        },
        updateLockedStatus(state,{ payload }: PayloadAction<boolean>){
            if(state.value.currentProcess)
                state.value.isBlocked = payload;
        }
    }
});

export const { setCurrentProcess,updateLockedStatus } = currentProcessSlice.actions;

export default currentProcessSlice.reducer;