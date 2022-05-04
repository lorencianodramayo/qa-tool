import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    isLoading: false,
    isDisabled: true,
    error: null,
    initialValues: {},
    selected: null,
    selectedIds: [],
    selectedIndex: []
}

const template = createSlice(
    {
        name: "template",
        initialState,
        reducers: {
            getTemplateStart: (state) => {
                state.error = null;
                state.isLoading = true;
            },
            resetTemplate: (state) => {
                state.initialValues = {};
                state.selected = null;
                state.data = [];
                state.error = null;
                state.selectedIds = [];
                state.selectedIndex = [];
                state.isLoading = false;
            },
            setTemplateVersions: (state, { payload }) => {
                state.initialValues[payload.key] = payload.value;
                state.data = state.selectedIds.map((data) => state.initialValues[data]);

                state.selectedIndex = state.selectedIds.map((data) => 
                    {
                        return {
                            creativeId: payload.key.toString().split("-")[1],
                            versionId: state.initialValues[data]
                        }
                    }
                );
                
                state.isLoading = false;
            },
            setTemplateSelected: (state, { payload }) => {
                state.selected = payload.rowKeys;
                state.selectedIds = payload.rowIds;
                state.data = payload.rowIds.map((data) => state.initialValues[data]);

                state.selectedIndex = payload.rowIds.map((data) => 
                    {
                        return {
                            creativeId: data.toString().split("-")[1],
                            versionId: state.initialValues[data]
                        }
                    }
                );
                
                state.isLoading = false;
            },
            setLoadingTemplate: (state) => {
                state.isLoading = false;
            }
        }   
    }
);

export const {
    getTemplateStart,
    setTemplateSelected,
    setTemplateVersions,
    resetTemplate,
    setLoadingTemplate
} = template.actions;

export default template.reducer;