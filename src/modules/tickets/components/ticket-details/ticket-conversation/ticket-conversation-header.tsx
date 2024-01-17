import styled from "styled-components";
import { Typography } from "@mui/material"
import { HeaderWrapper } from "../ticket-list-view"
import { FlexBox } from "lib/ui-ux"
import { ITicketDetails } from "modules/tickets/apis";

export const Platform = styled(Typography) <{ $platform: string }>`
   && {
    color: ${({ theme, $platform }) => {
        switch ($platform) {
            case 'facebook':
                return theme.channelSpecific.facebook;
            case 'email':
                return theme.channelSpecific.email
            case 'whatsapp':
                return theme.channelSpecific.whatsApp
            case 'twitter':
                return theme.channelSpecific.twitter
            case 'telephonic':
                return theme.channelSpecific.telephonic
            case 'instagram':
                return theme.channelSpecific.instagram
            case 'sms':
                return theme.channelSpecific.sms
            default:
                return undefined
        }
    }};
    font-weight: bold;
   }
`;

export const TicketConversationHeader = (props: { ticketDetailsById: ITicketDetails | undefined }) => {
    const { ticketDetailsById } = props;
    return (
        <HeaderWrapper width="100%" flexDirection="column">
            <Typography variant="h5">Conversations</Typography>
            <FlexBox gap="5px">
                <Typography variant="body2">with {ticketDetailsById?.customerName ? ticketDetailsById.customerName + ' via' : 'Siddarth Menon via'}</Typography>
                <Platform variant="body2" $platform={ticketDetailsById?.source.toLocaleLowerCase() ?? ''}>{ticketDetailsById?.source}</Platform>
            </FlexBox>
        </HeaderWrapper>
    )
}