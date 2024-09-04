import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IConfigurationState {
    totalPages: number;
    whatsAppWebhookUrl: string;
}
const intitalState: IConfigurationState = {
    totalPages: 0,
    whatsAppWebhookUrl: "",
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
        }
    }
})

export const { setTotalPage, setWhatsAppWebhookUrl } = configurationSlice.actions

export default configurationSlice.reducer