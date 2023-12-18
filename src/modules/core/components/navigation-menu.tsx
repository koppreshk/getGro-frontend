
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { Chip, Tooltip } from "@mui/material";
import { GroupOutlined, HomeOutlined, SettingsOutlined, TaskOutlined } from "@mui/icons-material";

interface IPrimaryOptionProps {
    item: {
        iconComponent: () => JSX.Element;
        primaryKey: string;
        route: string;
        title: string;
        countValue?: string;
        showCount?: boolean;
    }
    selectedMenu: string;
    onMenuOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MenuWrapper = styled.div`
    width: 64px;
    background-color: #ffff;
    height: 100%;
    border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
    padding-top: 15px;
`;

const usePrimaryOptions = () => {
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords') || '10';

    return [{
        iconComponent: () => <HomeOutlined />,
        primaryKey: 'dashboard',
        route: 'dashboard',
        title: 'Dashboard'
    },
    {
        iconComponent: () => <TaskOutlined sx={{}} width='32px' height='32px' />,
        showCount: true,
        countValue: noOfRecords,
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
        primaryKey: 'settings',
        route: 'settings',
        title: 'Settings'
    }];
}

const IconWrapper = styled(FlexBox) <{ $isOptionsSelected: boolean }>`
    ${({ $isOptionsSelected }) => $isOptionsSelected ? css`
    /* background-color: #e4f0fd;
    color: #1976d2; */
    background-color: ${({ theme }) => theme.pallete.purpleLight};
    color: ${({ theme }) => theme.pallete.primaryPurple};
    `: css`
    background-color: unset;
    color: ${({ theme }) => theme.pallete.grayNeutral};
    `};
    height: 40px;
    width: 40px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
`;

const StyledChip = styled(Chip)`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    &&{
        .MuiChip-label {
                padding: 0;
            }

    }

`;

export const NavigationMenu = React.memo(() => {
    const { pathname } = useLocation();
    const [selectedMenu, setMenu] = React.useState(() => pathname === '/' ? 'dashboard' : pathname?.split('/')[1] ?? 'dashboard');
    const primaryOptions = usePrimaryOptions();

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
    const { iconComponent, primaryKey, route, title, showCount, countValue } = item;
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
                {showCount && isOptionsSelected && <StyledChip label={countValue} size="small" variant="filled" color="primary" />}
            </IconWrapper>
        </Tooltip>
    )
})