import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { ArchiveOutlined } from "@mui/icons-material";
import { DrawerExtended, FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { useAppSelector } from "lib/hooks";
import { TicketDisposeContainer } from "modules/tickets/containers";

const StyledButton = styled(Button)`
    &&{
        margin: 10px;
        width: calc(100% - 20px);
        box-sizing: border-box;
        background: ${({ theme }) => theme.pallete.toolbarBgColor};
        
        @property --myColor1 {
            syntax: '<color>';
            initial-value: #323452;
            inherits: false;
        }

        @property --myColor2 {
            syntax: '<color>';
            initial-value: #3d4279;
            inherits: false;
        }
        background: linear-gradient(to right top, var(--myColor1), var(--myColor2));
        transition: --myColor1 0.35s, --myColor2 0.35s;
        
        &:hover {  
            --myColor1: #323452;
            --myColor2: #6a69f6;
        }
    }
`;

export const TicketDispose = () => {
    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);
    const doesRequiredMedadataExist = ticketDetails !== undefined;

    const [openTicketDisposeDrawer, setTicketDisposeDrawer] = React.useState(false);

    const onToggleTicketDispose = () => setTicketDisposeDrawer((prevalue) => !prevalue);

    return (
        <>
            <FlexBox flexDirection="column">
                <HorizontalSeparator />
                <StyledButton
                    variant="contained"
                    startIcon={<ArchiveOutlined />}
                    disabled={!doesRequiredMedadataExist}
                    onClick={onToggleTicketDispose}>
                    Dispose Ticket
                </StyledButton>
            </FlexBox>
            <DrawerExtended
                header="Dispose Ticket"
                width="420px"
                anchor="right"
                open={openTicketDisposeDrawer}
                onRenderContent={() => <TicketDisposeContainer onToggleTicketDispose={onToggleTicketDispose} />}
                onClose={onToggleTicketDispose}>
            </DrawerExtended>
        </>
    )
}
