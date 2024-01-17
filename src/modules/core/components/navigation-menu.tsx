
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { Popover, Tooltip, Typography, Badge } from "@mui/material";
import { EventOutlined, GroupOutlined, InsertChartOutlined, SettingsOutlined, TaskOutlined } from "@mui/icons-material";
import { usePermissions } from "lib/hooks";

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

const MenuWrapper = styled(FlexBox)`
    width: 64px;
    background-color: #ffff;
    height: 100%;
    border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
    padding-top: 15px;
`;

const SecondaryOptionWrapper = styled(FlexBox)`
    margin-bottom: 20px;
`;

const usePrimaryOptions = () => {
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords') || '10';
    const { isCustomersPageAccessible, isDashboardPageAccessible, isSettingsPageAccessible, isTicketsPageAccessible } = usePermissions();

    return [{
        iconComponent: () => <InsertChartOutlined />,
        primaryKey: 'dashboard',
        route: 'dashboard',
        title: 'Dashboard',
        hidden: !isDashboardPageAccessible
    },
    {
        iconComponent: () => (
            <Badge color="primary" badgeContent={noOfRecords} max={999}>
                <TaskOutlined width='32px' height='32px' />
            </Badge>),
        primaryKey: 'tickets',
        route: 'tickets',
        title: 'Tickets',
        hidden: !isTicketsPageAccessible
    }, {
        iconComponent: () => <GroupOutlined />,
        primaryKey: 'customers',
        route: 'customers',
        title: 'Customers',
        hidden: !isCustomersPageAccessible
    }, {
        iconComponent: () => <SettingsOutlined />,
        primaryKey: 'settings',
        route: 'settings',
        title: 'Settings',
        hidden: !isSettingsPageAccessible
    }];
}

const IconWrapper = styled(FlexBox) <{ $isOptionsSelected: boolean }>`
    ${({ $isOptionsSelected }) => $isOptionsSelected ? css`
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

const SecondaryIconWrapper = styled(FlexBox)`
    background-color: unset;
    color: ${({ theme }) => theme.pallete.grayNeutral};
    height: 40px;
    width: 40px;
    border-radius: 6px;
    cursor: pointer;
`;

export const NavigationMenu = React.memo(() => {
    const { pathname } = useLocation();
    const [selectedMenu, setMenu] = React.useState(() => pathname === '/' ? 'dashboard' : pathname?.split('/')[1] ?? 'dashboard');
    const primaryOptions = usePrimaryOptions();

    return (
        <MenuWrapper flexDirection="column" justifyContent="space-between">
            <PrimaryOptionsWrapper gap="10px" flexDirection="column" justifyContent="center" alignItems="center">
                {primaryOptions.map((item) => (
                    <React.Fragment key={item.primaryKey}>
                        {
                            item.hidden ? null :
                                <PrimaryOption
                                    item={item}
                                    selectedMenu={selectedMenu}
                                    onMenuOptionClick={setMenu} />
                        }
                    </React.Fragment>

                ))}
            </PrimaryOptionsWrapper>
            <SecondaryOptionWrapper flexDirection="column" justifyContent="center" alignItems="center">
                <SecondaryOption />
            </SecondaryOptionWrapper>
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
            <IconWrapper $isOptionsSelected={isOptionsSelected} alignItems="center" justifyContent="center" onClick={onClick}>
                {iconComponent()}
            </IconWrapper>
        </Tooltip>
    )
})

const SecondaryOption = React.memo(() => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <SecondaryIconWrapper onClick={handleClick} alignItems="center" justifyContent="center">
                <Tooltip title="Reminders" arrow placement="right">
                    <EventOutlined />
                </Tooltip>
            </SecondaryIconWrapper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ReminderContent />
            </Popover>
        </>
    )
});

const ReminderContent = () => {
    return (
        <FlexBox height="500px" width="300px">
            <Typography variant="h5">Reminder content</Typography>
        </FlexBox>
    )
}