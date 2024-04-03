import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { OrderDetailsContainer, TicketOverviewContainer, PastTicketsContainer } from "modules/tickets/containers";
import { MenuOptions, TicketSideMenu } from "./ticket-side-menu";
import { TicketNotes } from "./ticket-notes";
import { useAppSelector } from "lib/hooks";
import { TicketDispose } from "./dispose-ticket";

const StyledFlexBox = styled(FlexBox)`  
    background-color: ${({ theme }) => theme.pallete.white};
`;

export const TicketDetailsSection = () => {
    const [selectedMenuOption, setSelectedMenuOption] = React.useState<string>(MenuOptions.CustomerProfile);
    const showHideTicketDetails = useAppSelector((state) => state.tickets.showHideTicketDetails)

    const onMenuOptionClick = React.useCallback((id: string) => {
        setSelectedMenuOption(id);
    }, []);

    const renderBasedOnSelectedview = React.useCallback(() => {
        switch (selectedMenuOption) {
            case MenuOptions.CustomerProfile:
                return <TicketOverviewContainer />;
            case MenuOptions.OrderDetails:
                return <OrderDetailsContainer />;
            case MenuOptions.Notes:
                return <TicketNotes />
            case MenuOptions.PastTickets:
                return <PastTicketsContainer />
            default: return <span>default</span>
        }
    }, [selectedMenuOption]);

    return (
        <StyledFlexBox width={'100%'} justifyContent={'flex-end'}>
            {showHideTicketDetails ?
                <FlexBox width='calc(100% - 52px)' flexDirection="column" height="100%">
                    <div style={{ height: 'calc(100% - 47px)' }}>
                        {renderBasedOnSelectedview()}
                    </div>
                    <TicketDispose />
                </FlexBox>
                : null}
            <TicketSideMenu onSetMenuOption={onMenuOptionClick} selectedMenuOption={selectedMenuOption} />
        </StyledFlexBox>
    )
}

