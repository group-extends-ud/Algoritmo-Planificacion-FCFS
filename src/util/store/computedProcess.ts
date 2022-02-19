import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessModel, ProcessInputModel } from "models/ProcessModel";

const computedProcessSlice = createSlice({
    name:'computedProcess',
    initialState:{
        value:[
            new ProcessModel(new ProcessInputModel('Bash',0,5)),
            new ProcessModel(new ProcessInputModel('B',0,2)),
            new ProcessModel(new ProcessInputModel('C',0,6)),
        ]
    },
    reducers:{
        addProcess({ value },{payload}: PayloadAction<ProcessModel>){
            value.push(payload);
        },
        updateProcess({ value }, { payload }: PayloadAction<ProcessModel>) {
            value = value.map((process) => {
                if(process.Id === payload.Id) {
                    return payload;
                }
                return process;
            });
        }
    }
});

export const { addProcess, updateProcess } = computedProcessSlice.actions;

export default computedProcessSlice.reducer;