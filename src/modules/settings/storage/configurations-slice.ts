import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigurationState {
    totalPages: number;
    whatsAppWebhookUrl: string;
    exotelWebhookUrl: string;
    exotelWebhookNumberUrl: string;
}
const intitalState: IConfigurationState = {
    totalPages: 0,
    whatsAppWebhookUrl: "",
    exotelWebhookUrl: "",
    exotelWebhookNumberUrl: ""
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
        },
        setExotelNumberWebhookUrl: (state, actions: PayloadAction<string>) => {
            state.exotelWebhookNumberUrl = actions.payload
        }
    }
})

export const { setTotalPage, setWhatsAppWebhookUrl, setExotelWebhookUrl, setExotelNumberWebhookUrl } = configurationSlice.actions

export default configurationSlice.reducer