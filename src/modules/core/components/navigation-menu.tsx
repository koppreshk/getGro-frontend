
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useNotifications } from "lib";
import { FlexBox, Icon } from "lib/ui-ux";

interface IPrimaryOptionProps {
    item: {
        iconName: string;
        primaryKey: string;
        route: string;
    }
    selectedMenu: string;
    onMenuOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MenuWrapper = styled.div`
    width: 64px;
    background-color: #001e38;
    height: 100%;
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
    padding-top: 15px;
`;

const primaryOptions = [{
    iconName: 'face',
    primaryKey: 'face',
    route: 'route1'
},
{
    iconName: 'menu',
    primaryKey: 'menu',
    route: 'route2'
}, {
    iconName: 'settings',
    primaryKey: 'settings',
    route: 'route3'
}, {
    iconName: 'add_circle',
    primaryKey: 'add_circle',
    route: 'route4'
}];

const IconWrapper = styled(FlexBox) <{ $isOptionsSelected: boolean }>`
    background-color: ${({ $isOptionsSelected }) => $isOptionsSelected ? '#039be5' : 'unset'};
    height: 40px;
    width: 40px;
    border-radius: 6px;
`;

export const NavigationMenu = React.memo(() => {
    const [selectedMenu, setMenu] = React.useState('face');
    const { showNotification } = useNotifications();

    React.useEffect(() => {
        showNotification({ message: 'Test', type: 'success' })
    }, [showNotification]);

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
    const { iconName, primaryKey, route } = item;
    const isOptionsSelected = React.useMemo(() => selectedMenu === primaryKey, [primaryKey, selectedMenu]);
    const navigate = useNavigate();

    const onClick = React.useCallback(() => {
        onMenuOptionClick(primaryKey);
        navigate(route);
    }, [navigate, onMenuOptionClick, primaryKey, route]);

    return (
        <IconWrapper $isOptionsSelected={isOptionsSelected} $alignItems="center" $justifyContent="center">
            <Icon className="material-symbols-outlined" iconName={iconName} onClick={onClick} />
        </IconWrapper>
    )
})