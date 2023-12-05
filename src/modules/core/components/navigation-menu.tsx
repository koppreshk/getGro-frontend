
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { Tooltip } from "@mui/material";
import { GroupOutlined, HomeOutlined, SettingsOutlined, TaskOutlined } from "@mui/icons-material";

interface IPrimaryOptionProps {
    item: {
        iconComponent: () => JSX.Element;
        primaryKey: string;
        route: string;
        title: string;
    }
    selectedMenu: string;
    onMenuOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MenuWrapper = styled.div`
    width: 64px;
    background-color: #ffff;
    height: 100%;
    border-right: 1px solid #E5EAF2;
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
    padding-top: 15px;
`;

const primaryOptions = [{
    iconComponent: () => <HomeOutlined />,
    primaryKey: 'dashboard',
    route: 'dashboard',
    title: 'Dashboard'
},
{
    iconComponent: () => <TaskOutlined sx={{}} width='32px' height='32px' />,
    primaryKey: 'tickets',
    route: 'tickets',
    title: 'Tickets'
}, {
    iconComponent: () => <GroupOutlined />,
    primaryKey: 'customers',
    route: 'customers',
    title: 'Customers'
}, {
    iconComponent: () => <SettingsOutlined />,
    primaryKey: 'configurations',
    route: 'configurations',
    title: 'configurations'
}];

const IconWrapper = styled(FlexBox) <{ $isOptionsSelected: boolean }>`
    ${({ $isOptionsSelected }) => $isOptionsSelected ? css`
    background-color: #e4f0fd;
    color: #1976d2;
    /* background-color: rgba(209, 209, 247, .25);
    color: #6969ff; */
    `: css`
    background-color: unset;
    color: #787f83;
    `};
    height: 40px;
    width: 40px;
    border-radius: 6px;
    cursor: pointer;
`;

export const NavigationMenu = React.memo(() => {
    const { pathname } = useLocation();
    const [selectedMenu, setMenu] = React.useState(() => pathname === '/' ? 'dashboard' : pathname?.split('/')[1] ?? 'dashboard');

    return (
        <MenuWrapper>
            <PrimaryOptionsWrapper $gap="10px" $flexDirection="column" $justifyContent="center" $alignItems="center">
                {primaryOptions.map((item) => (
                    <PrimaryOption
                        key={item.primaryKey}
                        item={item}
                        selectedMenu={selectedMenu}
                        onMenuOptionClick={setMenu} />
                ))}
            </PrimaryOptionsWrapper>
        </MenuWrapper>
    )
})

const PrimaryOption = React.memo((props: IPrimaryOptionProps) => {
    const { item, selectedMenu, onMenuOptionClick } = props;
    const { iconComponent, primaryKey, route, title } = item;
    const isOptionsSelected = React.useMemo(() => selectedMenu === primaryKey, [primaryKey, selectedMenu]);
    const navigate = useNavigate();

    const onClick = React.useCallback(() => {
        onMenuOptionClick(primaryKey);
        navigate(route);
    }, [navigate, onMenuOptionClick, primaryKey, route]);

    return (
        <Tooltip title={title} arrow placement="right">
            <IconWrapper $isOptionsSelected={isOptionsSelected} $alignItems="center" $justifyContent="center" onClick={onClick}>
                {iconComponent()}
            </IconWrapper>
        </Tooltip>
    )
})