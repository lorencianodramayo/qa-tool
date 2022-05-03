import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isDisabled: true,
    error: null,
    selected: null
}

const partner = createSlice(
    {
        name: "partner",
        initialState,
        reducers: {
            getPartnerStart: (state) => {
                state.error = null;
                state.isLoading = true;
            },
            isPartnerSuccess: (state, { payload }) => {
                state.data = payload;
                state.isDisabled = false; 
                state.isLoading = false;
            },
            isPartnerError: (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
                state.isLoading = false; 
            },
            setPartnerSelected: (state, { payload }) => {
                state.selected = payload;
            }
        }   
    }
);

export const {
    getPartnerStart,
    isPartnerSuccess,
    isPartnerError,
    setPartnerSelected
} = partner.actions;

export default partner.reducer;