import styled from "styled-components";
import { PersonOutlineOutlined, ShoppingCartOutlined, DescriptionOutlined, ArchiveOutlined, ChevronRight, ChevronLeft, ConfirmationNumberOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { setShowHideTicketDetails } from "modules/tickets/storage";
import { useCallback } from "react";

interface IMenuOption {
    title: string;
    id: MenuOptions;
    iconComponent: () => JSX.Element;
    disabled?: boolean;
}
const SideMenuWrapper = styled(FlexBox)`
    padding: 10px 8px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.others.sideMenuBg};
`;

const IconWrapper = styled(FlexBox) <{ $isSelected: boolean; $isDisabled?: boolean }>`
    border-radius: 6px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    color: ${({ theme, $isSelected }) => $isSelected ? '#544dc9' : theme.others.sideMenuIconColor};
    background-color: ${({ $isSelected }) => $isSelected ? '#e5e4fc' : 'unset'};
    opacity: ${({ $isDisabled }) => $isDisabled ? '0.5' : '1'};
    cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
    &:hover {
        background-color: ${({ theme, $isSelected }) => $isSelected ? '#e5e4fc' : theme.others.sideMenuHoverColor};
    }  
`;

export enum MenuOptions {
    CustomerProfile = 'customer-profile',
    OrderDetails = 'order-details',
    Notes = 'notes',
    TicketDispose = 'ticket-dispose',
    PastTickets = 'past-tickets'
}

const useSideMenuOptions = () => {
    const customerInfo = useAppSelector((state) => state.tickets.ticketDetails?.customerInfo)
    return [
        {
            title: 'Customer Profile',
            id: MenuOptions.CustomerProfile,
            iconComponent: () => <PersonOutlineOutlined />
        },
        {
            title: !customerInfo?.omsCustomerId ? 'Link a customer to get order details' : 'Order Details',
            id: MenuOptions.OrderDetails,
            iconComponent: () => <ShoppingCartOutlined />,
            disabled: !customerInfo?.omsCustomerId
        },
        {
            title: 'Notes',
            id: MenuOptions.Notes,
            iconComponent: () => <DescriptionOutlined />
        },
        {
            title: 'Past Tickets',
            id: MenuOptions.PastTickets,
            iconComponent: () => <ConfirmationNumberOutlined />
        },
        {
            title: 'Ticket Dispose',
            id: MenuOptions.TicketDispose,
            iconComponent: () => <ArchiveOutlined />
        }
    ] as IMenuOption[];
}

interface ITicketSideMenuProps {
    selectedMenuOption: string;
    onSetMenuOption: (id: string) => void;
}

export const TicketSideMenu = (props: ITicketSideMenuProps) => {
    const { selectedMenuOption, onSetMenuOption } = props;
    const sideMenuOptions = useSideMenuOptions();
    const dispatch = useAppDispatch();
    const showHideTicketDetails = useAppSelector((state) => state.tickets.showHideTicketDetails)

    const onExpandCollapse = useCallback(() => {
        dispatch(setShowHideTicketDetails());
    }, [dispatch])

    const onOptionClick = useCallback((value: IMenuOption) => {
        if (!value.disabled) {
            onSetMenuOption(value.id);
            !showHideTicketDetails && onExpandCollapse();
        }
    }, [onExpandCollapse, onSetMenuOption, showHideTicketDetails])

    return (
        <SideMenuWrapper flexDirection="column" gap="12px" justifyContent="space-between">
            <FlexBox flexDirection="column" gap="12px">
                {sideMenuOptions.map((option, index) => (
                    <Tooltip key={index} title={option.title} arrow placement="left">
                        <IconWrapper $isSelected={selectedMenuOption === option.id} $isDisabled={option.disabled} onClick={() => onOptionClick(option)}>
                            {option.iconComponent()}
                        </IconWrapper>
                    </Tooltip>
                ))}
            </FlexBox>
            <FlexBox flexDirection="column" gap="12px">
                <Tooltip title="Exapnd/Collapse" arrow placement="left">
                    <IconButton onClick={onExpandCollapse}>
                        {showHideTicketDetails ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </Tooltip>
            </FlexBox>
        </SideMenuWrapper>
    )
}