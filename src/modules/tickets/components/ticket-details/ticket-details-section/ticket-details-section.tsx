import React from "react";
import styled from "styled-components";
import { GridLayout } from "lib/ui-ux";
import { OrderDetailsContainer } from "modules/tickets/containers";
import { MenuOptions, TicetSideMenu } from "./ticket-side-menu";
import { TicketOverview } from "./ticket-overview";
import { TicketNotes } from "./ticket-notes";
import { TicketDispose } from "./ticket-dispose";

const StyledGridLayout = styled(GridLayout)`  
    background-color: ${({ theme }) => theme.pallete.white};
`;

export const TicketDeatilsSection = () => {
    const [selectedMenuOption, setSelectedMenuOption] = React.useState<string>(MenuOptions.CustomerProfile);

    const onMenuOptionClick = React.useCallback((id: string) => {
        setSelectedMenuOption(id);
    }, []);

    const renderBasedOnSelctedview = React.useCallback(() => {
        switch (selectedMenuOption) {
            case MenuOptions.CustomerProfile:
                return <TicketOverview />;
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
        <StyledGridLayout $gridTemplateColumns={"calc(100% - 56px) 56px"} $width="100%">
            <div>
                {renderBasedOnSelctedview()}
            </div>
            <TicetSideMenu onSetMenuOption={onMenuOptionClick} selectedMenuOption={selectedMenuOption} />
        </StyledGridLayout>
    )
}

