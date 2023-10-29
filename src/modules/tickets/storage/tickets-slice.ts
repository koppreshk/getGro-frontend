import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TicketsState {
    pageNumber: number;
    itemsPerPage: number;
    totalPages: number;
}

const initialState: TicketsState = {
    pageNumber: 1,
    itemsPerPage: 10,
    totalPages: 0,
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload
        },
        setTotalPages : (state, action: PayloadAction<number>)=> {
            state.totalPages = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setItemsPerPage, setPageNumber, setTotalPages } = ticketsSlice.actions

export default ticketsSlice.reducer