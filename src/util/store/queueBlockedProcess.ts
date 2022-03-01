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
            state.value.push({processBlocked: payload, waiting: 4});
        },
        updateWaitingTime(state,{payload}:PayloadAction<ProcessBlocked>){
            if(state.value.find((process) => process.processBlocked.Id === payload.processBlocked.Id)){
                state.value = state.value.map((element) => {
                    if(payload.processBlocked.Id === element.processBlocked.Id){
                        element.waiting -= 1;
                    }
                    return element;
                });
            }
        },
        removeElement(state){
            state.value.reverse().pop();
            state.value.reverse();
        }
    }
});

export const { addProcessBlocked,updateWaitingTime,removeElement } = queueBlockedProcessSlice.actions;

export default queueBlockedProcessSlice.reducer;