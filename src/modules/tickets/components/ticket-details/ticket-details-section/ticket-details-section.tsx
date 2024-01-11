import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { OrderDetailsContainer, TicketOverviewContainer } from "modules/tickets/containers";
import { MenuOptions, TicketSideMenu } from "./ticket-side-menu";
import { TicketNotes } from "./ticket-notes";
import { TicketDispose } from "./dispose-ticket/ticket-dispose";
import { useAppSelector } from "lib/hooks";

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
                return <OrderDetailsContainer />
            case MenuOptions.Notes:
                return <TicketNotes />
            case MenuOptions.TicketDispose:
                return <TicketDispose />
            default: return <span>default</span>
        }
    }, [selectedMenuOption]);

    return (
        <StyledFlexBox $width={'100%'} $justifyContent={'flex-end'}>
            {showHideTicketDetails ?
                <div style={{ width: 'calc(100% - 56px)' }}>
                    {renderBasedOnSelectedview()}
                </div>
                : null}
            <TicketSideMenu onSetMenuOption={onMenuOptionClick} selectedMenuOption={selectedMenuOption} />
        </StyledFlexBox>
    )
}

