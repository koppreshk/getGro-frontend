import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITicketDetails } from '../apis';

interface TicketsState {
  totalPages: number;
  showHideTicketDetails: boolean;
  isAdvanceFiltersEnabled: boolean;
  ticketDetails?: ITicketDetails;
  ticketReadStatus: Pick<ITicketDetails, 'ticketId' | 'has_read'>[];
}

const initialState: TicketsState = {
  totalPages: 0,
  showHideTicketDetails: true,
  isAdvanceFiltersEnabled: false,
  ticketDetails: undefined,
  ticketReadStatus: [],
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
    setTicketReadStatus: (
      state,
      action: PayloadAction<Pick<ITicketDetails, 'ticketId' | 'has_read'>[]>
    ) => {
      state.ticketReadStatus = action.payload;
    },
    setAdvanceFiltersState: (state, action: PayloadAction<boolean>) => {
      state.isAdvanceFiltersEnabled = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTotalPages,
  setShowHideTicketDetails,
  setTicketDetails,
  setTicketReadStatus,
  setAdvanceFiltersState,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
