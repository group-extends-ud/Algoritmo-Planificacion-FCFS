import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name:'timer',
    initialState:{
        value:0
    },
    reducers:{
        updateTimer(state,{payload}: PayloadAction<number>){
            state.value = payload;
        }
    }
});

export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;