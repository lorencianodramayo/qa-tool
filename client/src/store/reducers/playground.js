import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    id: null,
    isLoading: false,
    isDisabled: false,
    error: null,
    baseUrl: null,
    default: {}
}

const playground = createSlice(
    {
        name: "playground",
        initialState,
        reducers: {
            setPlaygroundStart: (state) => {
                state.isLoading = true;
                state.isDisabled = true;
            },
            resetPlayground: (state) => {
                state.data = [];
                state.id = null;
                state.error = null;
                state.isLoading = false;
                state.isDisabled = false; 
            },
            isPlaygroundSuccess:  (state, { payload }) => {
                state.id = payload._id;
                state.data = payload;
                state.isDisabled = false; 
                state.isLoading = false;
            },
            isPlaygroundError: (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
                state.isDisabled = false;
            },
            setPlaygroundDefault: (state, { payload }) => {
                state.isLoading = false;
                state.isDisabled = false;
                state.default = payload.template;
                state.baseUrl = payload.baseUrl;
            }
        }
    }
);

export const {
    setPlaygroundStart,
    setPlaygroundDefault,
    isPlaygroundSuccess,
    isPlaygroundError
} = playground.actions;

export default playground.reducer;