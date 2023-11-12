import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TicketsState {
    totalPages: number;
}

const initialState: TicketsState = {
    totalPages: 0,
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTotalPages } = ticketsSlice.actions

export default ticketsSlice.reducer