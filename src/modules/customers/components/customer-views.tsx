import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import React from "react";
import { useCallback } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const CustomerViewsWrapper = styled(FlexBox)`
    width: 200px;
    height: 100%;
    padding: 20px 0px;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-right-width: thin;
`;

const OptionWrapper = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  box-sizing: border-box;
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
        background-color: #fff;
        color: ${(props) => props.theme.pallete.defaultTextColor};
    `}
`;

const customerViewOptions = [
    {
        name: 'Indivisual',
        route: 'indivisual',
        primaryKey: 'indivisual'
    },
    {
        name: 'Organzation',
        route: 'organzation',
        primaryKey: 'organzation'
    },
    {
        name: 'Channel Partner',
        route: 'channel-partner',
        primaryKey: 'channel-partner'
    },
]

export const CustomerViews = () => {

    return (
        <CustomerViewsWrapper flexDirection="column">
            {customerViewOptions.map((data) => <CustomerViewOptions name={data.name} route={data.route} key={data.primaryKey} />)}
        </CustomerViewsWrapper>

    );
};

interface ICustomerViewOptionsProps {
    name: string;
    route: string;
}

const CustomerViewOptions = (props: ICustomerViewOptionsProps) => {
    const { name, route } = props;
    const navigate = useNavigate();
    const match = useMatch(`customers/:route`)
    const selectedMenu = match?.params.route;
    const isOptionSelected = React.useMemo(() => selectedMenu === route, [route, selectedMenu]);

    const onLinkClick = useCallback(() => {
        navigate(route);
    }, [navigate, route]);

    return (
        <Wrapper onClick={onLinkClick} $isOptionSelected={isOptionSelected}>
            <OptionWrapper >
                <Typography variant="h6" color="inherit">
                    {name}
                </Typography>
            </OptionWrapper>
        </Wrapper>
    )
}