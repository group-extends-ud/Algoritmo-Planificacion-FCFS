import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const algorithmStatusSlice = createSlice({
    name:'algorithmStatus',
    initialState:{
        value: false
    },
    reducers:{
        setAlgorithmStatus({ value }, { payload }: PayloadAction<boolean>){
            value = payload;
        },
    }
});

export const { setAlgorithmStatus } = algorithmStatusSlice.actions;

export default algorithmStatusSlice.reducer;