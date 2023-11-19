import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"

interface IModuleSubMenuOptionProps {
    name: string,
    primaryKey: string,
    route: string
}

interface IModuleSubMenuProps {
    subMenuOptions: {
        name: string,
        primaryKey: string,
        route: string
    }[]
}

const ViewsWrapper = styled(FlexBox)`
    width: 200px;
    height: 100%;
    background-color: ${(props) => props.theme.pallete.white};
    padding: 20px 0px;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-right-width: thin;
`;

const Wrapper = styled.div<{ $isOptionSelected: boolean }>`
:hover {
        background: ${(props) => props.theme.pallete.powderBlue};
    }
    ${({ $isOptionSelected }) => $isOptionSelected ? css`
    background-color: ${(props) => props.theme.pallete.powderBlue};
    color:  ${(props) => props.theme.pallete.blue};
    border-right-width: 4px;
    border-style: solid;
    border-color: ${(props) => props.theme.pallete.blue};
    border-width: 0;
    border-right-width: thick;
  ` : css`
  background-color: ${(props) => props.theme.pallete.white};
  color: inherit;
  `}
`;

const OptionWrapper = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const ModuleSubMenu = (props: IModuleSubMenuProps) => {
    const { subMenuOptions } = props;
    return (
        <ViewsWrapper $flexDirection="column">
            {subMenuOptions.map((item) => (
                <ModuleSubMenuOption name={item.name} key={item.primaryKey} route={item.route} />
            ))}
        </ViewsWrapper>
    )
}
const ModuleSubMenuOption = (props: Pick<IModuleSubMenuOptionProps, 'name' | 'route'>) => {
    const { name, route } = props;
    const navigate = useNavigate();
    const match = useMatch(`/:module/:route`);
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