import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITicketDetails } from '../apis';

interface ILinkedCustomer {
    customerId?: number,
    email?: string,
    name?: string,
    phoneNumber?: string,
    ticketId?: string
}

interface TicketsState {
    totalPages: number;
    linkedCustomer: ILinkedCustomer;
    showHideTicketDetails: boolean;
    ticketDetails?: ITicketDetails;
}

const initialState: TicketsState = {
    totalPages: 0,
    showHideTicketDetails: true,
    linkedCustomer: {
        customerId: undefined,
        email: undefined,
        name: undefined,
        phoneNumber: undefined,
        ticketId: undefined
    },
    ticketDetails: undefined
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setLinkedCustomer: (state, action: PayloadAction<ILinkedCustomer>) => {
            state.linkedCustomer = action.payload
        },
        setShowHideTicketDetails: (state) => {
            state.showHideTicketDetails = !state.showHideTicketDetails
        },
        setTicketDetails: (state, action: PayloadAction<ITicketDetails>) => {
            state.ticketDetails = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTotalPages, setLinkedCustomer, setShowHideTicketDetails, setTicketDetails } = ticketsSlice.actions

export default ticketsSlice.reducer