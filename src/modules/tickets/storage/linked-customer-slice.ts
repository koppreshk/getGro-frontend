import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LinkedCustomerSlice {
    customerId: number | undefined;
    name: string;
    phoneNumber: string;
    email: string;
    ticketId: string;
}

const initialState: LinkedCustomerSlice = {
    customerId: undefined,
    email: '',
    name: '',
    phoneNumber: '',
    ticketId: ''
}

export const linkedCustomerSlice = createSlice({
    name: 'linkedCustomer',
    initialState,
    reducers: {
        setCustomerId: (state, action: PayloadAction<number>) => {
            state.customerId = action.payload
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setTicketId: (state, action: PayloadAction<string>) => {
            state.ticketId = action.payload
        },
    },
})

export const { setCustomerId, setEmail, setName, setPhoneNumber, setTicketId } = linkedCustomerSlice.actions

export default linkedCustomerSlice.reducer