import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessModel } from "models/ProcessModel";
import { ProcessBlocked } from "util/props";

const queueBlockedProcessSlice = createSlice({
    name:'queueBlockedProcess',
    initialState:{
        value:[] as ProcessBlocked[]
    },
    reducers:{
        addProcessBlocked(state,{payload}: PayloadAction<ProcessModel>){
            state.value.push({processBlocked: payload, waiting: 0});
        },
    }
});

export const { addProcessBlocked } = queueBlockedProcessSlice.actions;

export default queueBlockedProcessSlice.reducer;