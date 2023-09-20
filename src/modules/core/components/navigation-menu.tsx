
import { FlexBox, Icon } from "lib/ui-ux";
import React from "react";
import styled from "styled-components";

interface IPrimaryOptionProps {
    iconName: string;
    primaryKey: string;
    onMenuOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MenuWrapper = styled.div`
    width: 64px;
    background-color: #001e38;
    height: 100%;
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
    padding-top: 40px;
`;

const primaryOptions = [{
    iconName: 'face',
    primaryKey: 'face'
},
{
    iconName: 'menu',
    primaryKey: 'menu'
}, {
    iconName: 'settings',
    primaryKey: 'settings'
}, {
    iconName: 'add_circle',
    primaryKey: 'add_circle'
}];


export const NavigationMenu = React.memo(() => {
    const [selectedMenu, setMenu] = React.useState('face');
    console.log('selectedMenu: ', selectedMenu);
    return (
        <MenuWrapper>
            <PrimaryOptionsWrapper $gap="10px" $flexDirection="column" $justifyContent="center" $alignItems="center">
                {primaryOptions.map((item) => (
                    <PrimaryOption
                        key={item.primaryKey}
                        iconName={item.iconName}
                        primaryKey={item.primaryKey}
                        onMenuOptionClick={setMenu} />
                ))}
            </PrimaryOptionsWrapper>
        </MenuWrapper>
    )
})

const PrimaryOption = React.memo((props: IPrimaryOptionProps) => {
    const { iconName, primaryKey, onMenuOptionClick } = props;

    const onClick = React.useCallback(() => {
        onMenuOptionClick(primaryKey);
    }, [onMenuOptionClick, primaryKey]);

    return (
        <Icon className="material-symbols-outlined" iconName={iconName} onClick={onClick} />
    )
})