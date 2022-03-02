import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessModel, ProcessInputModel } from "models/ProcessModel";

const computedProcessSlice = createSlice({
    name:'computedProcess',
    initialState:{
        value:[
            new ProcessModel(new ProcessInputModel('Bash',0,5, 3)),
            new ProcessModel(new ProcessInputModel('B',0,2, 4)),
            new ProcessModel(new ProcessInputModel('C',0,6, 0)),
        ]
    },
    reducers:{
        addProcess(state,{payload}: PayloadAction<ProcessModel>){
            state.value.push(payload);
        },
        updateProcess(state, { payload }: PayloadAction<ProcessModel>) {
            state.value = state.value.map((process) => {
                if(process.Id === payload.Id) {
                    return payload;
                }
                return process;
            });
        },
        changeComputesList(state,{ payload }:PayloadAction<ProcessModel[]>){
            state.value = payload;
        }
    }
});

export const { addProcess, updateProcess,changeComputesList } = computedProcessSlice.actions;

export default computedProcessSlice.reducer;