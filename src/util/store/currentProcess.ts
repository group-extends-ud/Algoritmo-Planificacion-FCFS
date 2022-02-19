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
        setCurrentProcess({ value },{ payload }: PayloadAction<ProcessModel | undefined>){
            value.currentProcess = payload;
        },
        updateLockedStatus({ value },{ payload }: PayloadAction<boolean>){
            if(value.currentProcess)
                value.isBlocked = payload;
        }
    }
});

export const { setCurrentProcess,updateLockedStatus } = currentProcessSlice.actions;

export default currentProcessSlice.reducer;