import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessModel } from "models/ProcessModel";
import { CurrentProcess } from 'util/props';

const currentProcessSlice = createSlice({
    name:'currentProcess',
    initialState:{
        value:{
            executed: 0,
            currentProcess: undefined 
        } as CurrentProcess
    },
    reducers:{
        setCurrentProcess(state,{ payload }: PayloadAction<ProcessModel | undefined>){
            state.value.currentProcess = payload;
        },
        incrementExecuted(state) {
            state.value.executed++;
        },
        resetExecuted(state) {
            state.value.executed = 0;
        }
    }
});

export const { setCurrentProcess, incrementExecuted, resetExecuted } = currentProcessSlice.actions;

export default currentProcessSlice.reducer;