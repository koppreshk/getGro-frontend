import { createSlice } from "@reduxjs/toolkit";

interface IConfigurationState {
    totalPages: number;
}
const intitalState: IConfigurationState = {
    totalPages: 0
}

export const configurationSlice = createSlice({
    name: 'configurations',
    initialState: intitalState,
    reducers: {
        setTotalPage: (state, actions) => {
            state.totalPages = actions.payload
        }
    }
})

export const { setTotalPage } = configurationSlice.actions

export default configurationSlice.reducer