import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITicketDetails } from '../apis';

interface TicketsState {
  totalPages: number;
  showHideTicketDetails: boolean;
  ticketDetails?: ITicketDetails;
}

const initialState: TicketsState = {
  totalPages: 0,
  showHideTicketDetails: true,
  ticketDetails: undefined,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setShowHideTicketDetails: (state) => {
      state.showHideTicketDetails = !state.showHideTicketDetails;
    },
    setTicketDetails: (state, action: PayloadAction<ITicketDetails>) => {
      state.ticketDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalPages, setShowHideTicketDetails, setTicketDetails } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
