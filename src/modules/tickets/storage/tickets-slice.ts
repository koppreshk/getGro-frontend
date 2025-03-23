import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITicketDetails } from '../apis';

interface TicketsState {
  totalPages: number;
  showHideTicketDetails: boolean;
  isAdvanceFiltersEnabled: boolean;
  ticketDetails?: ITicketDetails;
  ticketsList: ITicketDetails[];
}

const initialState: TicketsState = {
  totalPages: 0,
  showHideTicketDetails: true,
  isAdvanceFiltersEnabled: false,
  ticketDetails: undefined,
  ticketsList: [],
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
    setTicketsList: (state, action: PayloadAction<ITicketDetails[]>) => {
      state.ticketsList = action.payload;
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
  setTicketsList,
  setAdvanceFiltersState,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
