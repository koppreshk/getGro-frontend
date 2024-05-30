import { Typography } from "@mui/material";
import { TicketAccessRights, useAutherization } from "lib/hooks";
import { FlexBox } from "lib/ui-ux"
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { TicketViewActionButtons } from "./ticket-details/ticket-list-view";

const ViewsWrapper = styled(FlexBox)`
    width: 200px;
    height: 100%;
    padding: 20px 0px;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-right-width: thin;
`;

const Wrapper = styled.div<{ $isOptionSelected: boolean }>`
    :hover {
        background: ${(props) => props.theme.pallete.purpleLight};
    }
    ${({ $isOptionSelected }) => $isOptionSelected ? css`
        background-color: ${(props) => props.theme.pallete.purpleLight};
        color:  ${(props) => props.theme.pallete.primaryPurpleText};
        border-right-width: 4px;
        border-style: solid;
        border-color: ${(props) => props.theme.pallete.primaryPurple};
        border-width: 0;
        border-right-width: thick;
    ` : css`
        background: ${({ theme }) => theme.pallete.white};
        color: ${(props) => props.theme.pallete.defaultTextColor};
    `}
`;

const OptionWrapper = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 0px 14px 15px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const useViewOptions = () => {
    const authorize = useAutherization();

    return [
        {
            name: 'All',
            primaryKey: 'all',
            route: 'all',
            // showOption: authorize(TicketAccessRights.All), //hiding this option until we get some clarity
            showOption: false
        },
        {
            name: 'Unassigned',
            primaryKey: 'unassigned',
            route: 'unassigned',
            showOption: authorize(TicketAccessRights.Unassigned)
        },
        {
            name: 'All Pending',
            primaryKey: 'all-pending',
            route: 'all-pending',
            showOption: authorize(TicketAccessRights.AllPending)
        },
        {
            name: 'All Complete',
            primaryKey: 'all-complete',
            route: 'all-complete',
            showOption: authorize(TicketAccessRights.AllComplete)
        },
        {
            name: 'All Junk',
            primaryKey: 'all-junk',
            route: 'all-junk',
            showOption: authorize(TicketAccessRights.AllJunk)
        },
        {
            name: 'Assigned To Me',
            primaryKey: 'assigned-to-me',
            route: 'assigned-to-me',
            showOption: authorize(TicketAccessRights.AssignedToMe)
        },
        {
            name: 'Created By Me',
            primaryKey: 'created-by-me',
            route: 'created-by-me',
            showOption: authorize(TicketAccessRights.CreatedByMe)
        },
        {
            name: 'Completed By Me',
            primaryKey: 'completed-by-me',
            route: 'completed-by-me',
            showOption: authorize(TicketAccessRights.CompletedByMe)
        },
        {
            name: 'Completed By Team',
            primaryKey: 'completed-by-team',
            route: 'completed-by-team',
            showOption: authorize(TicketAccessRights.CompletedByTeam)
        },
        {
            name: 'Pending By Team',
            primaryKey: 'pending-by-team',
            route: 'pending-by-team',
            showOption: authorize(TicketAccessRights.PendingByTeam)
        },
    ]

}

export const TicketViews = () => {
    const viewOptions = useViewOptions();
    return (
        <ViewsWrapper flexDirection="column">
            <HeaderWrapper width="100%">
                <TicketViewActionButtons />
            </HeaderWrapper>
            {viewOptions.map((item) => (
                <React.Fragment key={item.primaryKey}>
                    {item.showOption ? <TicketViewOptions name={item.name} route={item.route} /> : null}
                </React.Fragment>
            ))}
        </ViewsWrapper>
    )
};

interface ITicketViewOptionsProps {
    name: string;
    route: string;
}

const TicketViewOptions = (props: ITicketViewOptionsProps) => {
    const { name, route } = props;
    const navigate = useNavigate();
    const match = useMatch(`/tickets/:route`);
    const selectedMenu = match?.params.route;
    const isOptionSelected = React.useMemo(() => selectedMenu === route, [route, selectedMenu]);

    const onLinkClick = React.useCallback(() => {
        navigate(route);
    }, [navigate, route]);

    return (
        <Wrapper onClick={onLinkClick} $isOptionSelected={isOptionSelected}>
            <OptionWrapper>
                <Typography variant="h6" color="inherit">
                    {name}
                </Typography>
            </OptionWrapper>
        </Wrapper>
    )
}