import { PhoneRounded, PostAdd } from "@mui/icons-material";
import { CustomIconButton, FlexBox } from "lib/ui-ux"
import styled from "styled-components";
import { TelephonicDialer } from "../ticket-conversation/telephonic-conversations";
import { AddTicket } from "./add-ticket";
import { useCallback } from "react";
import React from "react";

const StyledIconButtons = styled(CustomIconButton)`
    && {
        border: 1px solid;
        border-color: #DAE2ED;
        border-radius: 12px;
    };
    & :hover {
        background-color: #fafafa;
    }
`;


export const TicketViewActionButtons = () => {

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);
    const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    const toggleAddTicketDrawer = useCallback(() => {
        setOpenAddTicketDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <FlexBox gap="5px" alignItems="center">
                <StyledIconButtons iconComponent={<PhoneRounded fontSize="small" />} size="small" color="primary" onClick={toggleCallBtn} tooltipProps={{ title: 'Make a call' }} />
                <StyledIconButtons iconComponent={<PostAdd fontSize="small" />} size="small" color="primary" onClick={toggleAddTicketDrawer} tooltipProps={{ title: 'Add Ticket' }} />
            </FlexBox>
            <TelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} />
            <AddTicket openAddTicketDrawer={openAddTicketDrawer} toggleAddTicketDrawer={toggleAddTicketDrawer} />

        </>
    )
}