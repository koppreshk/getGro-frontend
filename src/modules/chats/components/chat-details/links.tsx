import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails, IconButton } from "@mui/material";
import { useAppSelector, useFeature } from "lib/hooks";
import { FlexBox, TicketInfoContent, VerticalSeparator } from "lib/ui-ux";
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { useUnLinkTicket } from "modules/chats/apis";
import { useTranslation } from "react-i18next";

export const Links = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);
    const { mutateAsync } = useUnLinkTicket();
    const { t } = useTranslation();

    const onUnlinkTicket = (ticketId: number) => {
        mutateAsync({
            conversation_id: chatDetails!.id,
            ticket_id: ticketId
        })
    }
    const isUnlinkFeatureAccessible = useFeature('unlink_conversation_ticket');

    return (
        <>
            <Accordion disableGutters defaultExpanded sx={{ boxShadow: 'none', margin: '0px 16px', border: '1px solid #E9EBED', borderRadius: '8px' }} >
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMore />}
                    sx={{ background: '#f7f8f9', borderRadius: '8px' }}>
                    <Typography variant="h6">{t('links')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FlexBox gap="15px" flexDirection="column">
                        {chatDetails?.linked_tickets.map((link) => {
                            return (
                                <FlexBox key={link.id} flexDirection="column" gap={'5px'}>
                                    <FlexBox justifyContent="space-between" alignItems="center">
                                        <FlexBox gap={'10px'}>
                                            <TicketInfoContent variant="h6">#{link.id}</TicketInfoContent>
                                            <VerticalSeparator height="auto" />
                                            <TicketInfoContent variant="h6">{link.status}</TicketInfoContent>
                                        </FlexBox>
                                        {isUnlinkFeatureAccessible
                                            ? <IconButton onClick={() => onUnlinkTicket(link.id)} title={t('unlink_ticket')}>
                                                <LinkOffIcon />
                                            </IconButton> : null}
                                    </FlexBox>
                                    <TicketInfoContent variant="body3">{link.description}</TicketInfoContent>
                                </FlexBox>
                            )
                        })}
                    </FlexBox>
                </AccordionDetails>
            </Accordion>
        </>
    )
}