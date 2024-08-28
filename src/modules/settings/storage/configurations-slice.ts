import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigurationState {
    totalPages: number;
    whatsAppWebhookUrl: string;
    exotelWebhookUrl: string;
}
const intitalState: IConfigurationState = {
    totalPages: 0,
    whatsAppWebhookUrl: "",
    exotelWebhookUrl: ""
}

export const configurationSlice = createSlice({
    name: 'configurations',
    initialState: intitalState,
    reducers: {
        setTotalPage: (state, actions) => {
            state.totalPages = actions.payload
        },
        setWhatsAppWebhookUrl: (state, actions: PayloadAction<string>) => {
            state.whatsAppWebhookUrl = actions.payload
        },
        setExotelWebhookUrl: (state, actions: PayloadAction<string>) => {
            state.exotelWebhookUrl = actions.payload
        }
    }
})

export const { setTotalPage, setWhatsAppWebhookUrl, setExotelWebhookUrl } = configurationSlice.actions

export default configurationSlice.reducer