import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isDisabled: true,
    error: null,
    selected: null
}

const concept = createSlice(
    {
        name: "concept",
        initialState,
        reducers: {
            getConceptStart: (state) => {
                state.error = null;
                state.isLoading = true;
            },
            resetConcept: (state) => {
                state.isDisabled = true; 
                state.data = [];
                state.error = null;
                state.selected = null;
                state.isLoading = false;
            },
            isConceptSuccess: (state, { payload }) => {
                state.data = payload;
                state.isLoading = false;
                
                state.isDisabled = payload.length !== undefined && payload.length !== 0? false : true;
            },
            isConceptError: (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
                state.isDisabled = true;
            },
            setConceptSelected: (state, { payload }) => {
                state.selected = payload;
            }
        }   
    }
);

export const {
    getConceptStart,
    isConceptError,
    isConceptSuccess,
    setConceptSelected,
    resetConcept
} = concept.actions;

export default concept.reducer;