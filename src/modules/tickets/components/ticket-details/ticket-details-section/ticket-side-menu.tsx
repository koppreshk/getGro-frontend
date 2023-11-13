import styled from "styled-components";
import { Person, ShoppingCart } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import { FlexBox } from "lib/ui-ux";

const SideMenuWrapper = styled(FlexBox)`
    padding: 8px;
    box-sizing: border-box;
    border-left: ${({ theme }) => theme.semantics.standardBorder};
`;

const IconWrapper = styled(FlexBox) <{ $isSelected: boolean }>`
    border-radius: 6px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    color: #68737d;
    background-color: ${({ $isSelected }) => $isSelected ? '#1f73b733' : 'unset'};
    &:hover {
        background-color: ${({ $isSelected }) => $isSelected ? '#1f73b733' : '#1f73b714'};;
    }  
`;

export enum MenuOptions {
    CustomerProfile = 'customer-profile',
    OrderDetails = 'order-details'
}

const sideMenuOptions = [
    {
        title: 'Customer Profile',
        id: MenuOptions.CustomerProfile,
        iconComponent: () => <Person />
    },
    {
        title: 'Order Details',
        id: MenuOptions.OrderDetails,
        iconComponent: () => <ShoppingCart />
    }
];

interface ITicetSideMenuProps {
    selectedMenuOption: string;
    onSetMenuOption: (id: string) => void;
}

export const TicetSideMenu = (props: ITicetSideMenuProps) => {
    const { selectedMenuOption, onSetMenuOption } = props;

    return (
        <SideMenuWrapper $flexDirection="column" $gap="12px">
            {sideMenuOptions.map((option, index) => <Tooltip title={option.title} key={index} arrow placement="left">
                <IconWrapper $isSelected={selectedMenuOption === option.id} onClick={() => onSetMenuOption(option.id)}>
                    {option.iconComponent()}
                </IconWrapper>
            </Tooltip>)}
        </SideMenuWrapper>
    )
}