import styled from "styled-components";
import { Typography } from "@mui/material"
import { HeaderWrapper } from "../ticket-list-view"
import { FlexBox } from "lib/ui-ux"

const Platform = styled(Typography) <{ $platform: string }>`
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
            case 'telephone':
                return theme.channelSpecific.telephone
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

export const TicketConversationHeader = () => {
    return (
        <HeaderWrapper $width="100%" $flexDirection="column">
            <Typography variant="h6">Conversations</Typography>
            <FlexBox $gap="5px">
                <Typography variant="body2">with Tilly Moughton via</Typography>
                <Platform variant="body2" $platform={'facebook'}>facebook</Platform>
            </FlexBox>
        </HeaderWrapper>
    )
}