import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { FlexBox, TicketInfoContent, VerticalSeparator } from "lib/ui-ux";

export const Links = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    return (
        <>
            <Accordion disableGutters defaultExpanded sx={{ boxShadow: 'none', margin: '0px 16px', border: '1px solid #E9EBED', borderRadius: '8px' }} >
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMore />}
                    sx={{ background: '#f7f8f9', borderRadius: '8px' }}>
                    <Typography variant="h6">Links</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FlexBox gap="15px" flexDirection="column">
                        {chatDetails?.linked_tickets.map((link) => {
                            return (
                                <FlexBox key={link.id} flexDirection="column" gap={'5px'}>
                                    <FlexBox gap={'10px'}>
                                        <TicketInfoContent variant="h6">#{link.id}</TicketInfoContent>
                                        <VerticalSeparator height="auto" />
                                        <TicketInfoContent variant="h6">{link.status}</TicketInfoContent>
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