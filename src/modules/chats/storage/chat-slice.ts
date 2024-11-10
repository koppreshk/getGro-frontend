import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChatConversation } from '../apis';

interface ChatState {
    chatDetails?: ChatConversation;
}

const initialState: ChatState = {
    chatDetails: undefined
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatDetails: (state, action: PayloadAction<ChatConversation>) => {
            state.chatDetails = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {  setChatDetails } = chatSlice.actions

export default chatSlice.reducer