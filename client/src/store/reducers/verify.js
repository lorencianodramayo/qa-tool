import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    error: null
}

const verify = createSlice(
    {
        name: "verify",
        initialState,
        reducers: {
            getVerifyStart: (state) => {
                state.error = null;
                state.isLoading = true;
            },
            resetVerify: (state) => {
                state.data = [];
                state.error = null;
                state.isLoading = false;
            },
            isVerifySuccess: (state, { payload }) => {
                const item = state.data.find(item => item._id === payload._id);
               if(item === undefined) {
                   state.data.push(payload);
               }
                state.isLoading = false;
            },
            isVerifyError: (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            }
        }   
    }
);

export const {
    getVerifyStart,
    resetVerify,
    isVerifySuccess,
    isVerifyError
} = verify.actions;

export default verify.reducer;