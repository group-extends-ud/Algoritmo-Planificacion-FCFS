import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const algorithmStatusSlice = createSlice({
    name:'algorithmStatus',
    initialState:{
        value: false
    },
    reducers:{
        setAlgorithmStatus(state, { payload }: PayloadAction<boolean>){
            state.value = payload;
        },
    }
});

export const { setAlgorithmStatus } = algorithmStatusSlice.actions;

export default algorithmStatusSlice.reducer;