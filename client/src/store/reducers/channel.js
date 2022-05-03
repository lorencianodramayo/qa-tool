import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isDisabled: true,
    error: null,
    templates: [],
    selected: null
}

const channel = createSlice(
    {
        name: "channel",
        initialState,
        reducers: {
            getChannelStart: (state) => {
                state.error = null;
                state.isLoading = true;
            },
            resetChannel: (state) => {
                state.isDisabled = true; 
                state.data = [];
                state.error = null;
                state.selected = null;
                state.isLoading = false;
                state.templates = [];
            },
            isChannelSuccess: (state, { payload }) => {
                state.data = payload.channels;
                state.templates = payload.templates;
                state.isLoading = false;
                
                state.isDisabled = payload.channels.length !== 0? false : true;
            },
            isChannelError: (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
                state.isDisabled = true;
            },
            setChannelSelected: (state, { payload }) => {
                state.selected = payload === undefined? null : payload;
            }
        }   
    }
);

export const {
    getChannelStart,
    isChannelError,
    isChannelSuccess,
    setChannelSelected,
    resetChannel
} = channel.actions;

export default channel.reducer;