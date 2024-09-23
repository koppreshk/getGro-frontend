import { createSlice } from '@reduxjs/toolkit'
import { IConfig } from '../apis/get-config';

interface CoreState {
    config: undefined | IConfig
}

const initialState: CoreState = {
    config: undefined
}

export const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        setCoreData: (state, action) => {
            state.config = action.payload;
        },
    },
})

export const { setCoreData } = coreSlice.actions;

export default coreSlice.reducer