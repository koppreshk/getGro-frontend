import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"

const ViewsWrapper = styled(FlexBox)`
    width: 200px;
    height: 100%;
    background-color: #fff;
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
    color:  ${(props) => props.theme.pallete.primaryPurple};
    border-right-width: 4px;
    border-style: solid;
    border-color: ${(props) => props.theme.pallete.primaryPurple};
    border-width: 0;
    border-right-width: thick;
  ` : css`
  background-color: #fff;
  color: inherit;
  `}
`;

const OptionWrapper = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  box-sizing: border-box;
`;

const viewOptions = [
    {
        name: 'Unassigned',
        primaryKey: 'unassigned',
        route: 'unassigned'
    },
    {
        name: 'All Pending',
        primaryKey: 'all-pending',
        route: 'all-pending'
    },
    {
        name: 'All Complete',
        primaryKey: 'all-complete',
        route: 'all-complete'
    },
    {
        name: 'All Junk',
        primaryKey: 'all-junk',
        route: 'all-junk'
    },
    {
        name: 'Assigned To Me',
        primaryKey: 'assigned-to-me',
        route: 'assigned-to-me'
    },
    {
        name: 'Created By Me',
        primaryKey: 'created-by-me',
        route: 'created-by-me'
    },
    {
        name: 'Completed By Me',
        primaryKey: 'completed-by-me',
        route: 'completed-by-me'
    },
    {
        name: 'Completed By Team',
        primaryKey: 'completed-by-team',
        route: 'completed-by-team'
    },
    {
        name: 'Pending By Team',
        primaryKey: 'pending-by-team',
        route: 'pending-by-team'
    },
]

export const TicketViews = () => {
    return (
        <ViewsWrapper $flexDirection="column">
            {viewOptions.map((item) => (
                <TicketViewOptions name={item.name} key={item.primaryKey} route={item.route} />
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
                <Typography variant="h6" fontSize="16px" color="inherit">
                    {name}
                </Typography>
            </OptionWrapper>
        </Wrapper>
    )
}