import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const algorithmSolverSlice = createSlice({
    name:'algorithmStatus',
    initialState:{
        value: "" as string
    },
    reducers:{
        setAlgorithmSolver(state, { payload }: PayloadAction<string>){
            state.value = payload;
        },
    }
});

export const { setAlgorithmSolver } = algorithmSolverSlice.actions;

export default algorithmSolverSlice.reducer;