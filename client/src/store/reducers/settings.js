import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabIndex: null,
    selectedSize: null,
    affix: {
        image: false, //global
        background: null, //global
        text: {}, // options per size
        split: {}, //options per size
        language: null, //global
    },
    defaultValues: {},
    isLoading: false,
}

const settings = createSlice(
    {
        name: "settings",
        initialState,
        reducers: {
            setImageVisibility: (state, { payload }) => {
                state.affix.image = !payload;
            },
        }
    }
)

export const {
    setImageVisibility,
} = settings.actions;

export default settings.reducer;