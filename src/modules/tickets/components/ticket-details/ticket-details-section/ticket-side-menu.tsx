import styled from "styled-components";
import { Person, ShoppingCart, Description, ArchiveOutlined } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { useAppSelector } from "lib/hooks";

const SideMenuWrapper = styled(FlexBox)`
    padding: 8px;
    box-sizing: border-box;
    background: ${({theme}) => theme.others.sideMenuBg};
`;

const IconWrapper = styled(FlexBox) <{ $isSelected: boolean; $isDisabled?: boolean }>`
    border-radius: 6px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    color: ${({theme}) => theme.others.sideMenuIconColor};
    background-color: ${({ $isSelected, theme }) => $isSelected ? theme.others.sideMenuActiveColor : 'unset'};
    opacity: ${({ $isDisabled }) => $isDisabled ? '0.5' : '1'};
    cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
    &:hover {
        background-color: ${({ $isSelected, theme }) => $isSelected ? theme.others.sideMenuActiveColor : theme.others.sideMenuActiveColor};
    }  
`;

export enum MenuOptions {
    CustomerProfile = 'customer-profile',
    OrderDetails = 'order-details',
    Notes = 'notes',
    TicketDispose = 'ticket-dispose'
}

const useSideMenuOptions = () => {
    const customerId = useAppSelector((state) => state.tickets.linkedCustomer.customerId)

    return [
        {
            title: 'Customer Profile',
            id: MenuOptions.CustomerProfile,
            iconComponent: () => <Person />
        },
        {
            title: customerId === undefined ? 'Link a customer to get order details' : 'Order Details',
            id: MenuOptions.OrderDetails,
            iconComponent: () => <ShoppingCart />,
            disabled: customerId === undefined
        },
        {
            title: 'Notes',
            id: MenuOptions.Notes,
            iconComponent: () => <Description />
        },
        {
            title: 'Ticket Dispose',
            id: MenuOptions.TicketDispose,
            iconComponent: () => <ArchiveOutlined />
        }
    ];
}

interface ITicketSideMenuProps {
    selectedMenuOption: string;
    onSetMenuOption: (id: string) => void;
}

export const TicketSideMenu = (props: ITicketSideMenuProps) => {
    const { selectedMenuOption, onSetMenuOption } = props;
    const sideMenuOptions = useSideMenuOptions();

    return (
        <SideMenuWrapper $flexDirection="column" $gap="12px">
            {sideMenuOptions.map((option, index) => <Tooltip title={option.title} key={index} arrow placement="left">
                <IconWrapper $isSelected={selectedMenuOption === option.id} $isDisabled={option.disabled} onClick={() => !option.disabled && onSetMenuOption(option.id)}>
                    {option.iconComponent()}
                </IconWrapper>
            </Tooltip>)}
        </SideMenuWrapper>
    )
}