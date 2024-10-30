import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components"
import { Typography } from "@mui/material";
import { DeleteOutlined, ReportOutlined } from '@mui/icons-material/';
import { useTranslation } from "react-i18next";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { TicketViewActionButtons } from "./ticket-details/ticket-list-view";

const ViewsWrapper = styled(FlexBox)`
    width: 200px;
    height: 100%;
    padding: 20px 0px;
    border-style: solid;
    border-color: #E5EAF2;
    border-width: 0;
    border-right-width: thin;
`;

const Wrapper = styled.div<{ $isOptionSelected: boolean; $disabled?: boolean }>`
    :hover {
        background: ${(props) => props.$disabled ? 'unset' : props.theme.pallete.purpleLight};
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
        background: ${({ theme }) => theme.pallete.white};
        color: ${(props) => props.theme.pallete.defaultTextColor};
    `}
    ${({ $disabled }) => {
        if($disabled){
            return css`
                background: ${({ theme }) => theme.pallete.grayVariant5};
                color: ${(props) => props.theme.pallete.defaultTextColor};
                cursor: not-allowed;
                pointer-events: none;
            `;
        }
    }};
`;

const OptionWrapper = styled(FlexBox)`
  padding: 12px 14px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 0px 14px 15px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const usePrimaryViewOptions = () => {
    const { t } = useTranslation();
    return [
        {
            name: t('all_tickets'),
            primaryKey: 'all-tickets',
            route: 'all_tickets'
        },
        {
            name: t('all_pending'),
            primaryKey: 'all-pending',
            route: 'all_pending'
        },
        {
            name: t('all_resolved'),
            primaryKey: 'all-resolved',
            route: 'all_resolved'
        },
        {
            name: t('all_closed'),
            primaryKey: 'all-closed',
            route: 'all_closed'
        },
        {
            name: t('my_pending'),
            primaryKey: 'my-pending',
            route: 'my_pending'
        },
        {
            name: t('my_resolved'),
            primaryKey: 'my-resolved',
            route: 'my_resolved'
        },
        {
            name: t('my_closed'),
            primaryKey: 'my-closed',
            route: 'my_closed'
        }
    ]
}

const useViewOptions = () => {
    const { t } = useTranslation();
    const primaryOptions = usePrimaryViewOptions();
    const res = {
        primaryOptions,
        secondaryOptions: [
            {
                name: t('deleted_tickets'),
                primaryKey: 'deleted-tickets',
                route: 'deleted-tickets',
                disabled: true,
                renderIcon: () => <DeleteOutlined />
            },
            {
                name: t('spam_tickets'),
                primaryKey: 'spam-tickets',
                route: 'spam-tickets',
                disabled: true,
                renderIcon: () => <ReportOutlined />
            },
        ]
    }

    return res;
}

export const TicketViews = () => {
    const { primaryOptions, secondaryOptions } = useViewOptions();
    return (
        <ViewsWrapper flexDirection="column">
            <HeaderWrapper width="100%">
                <TicketViewActionButtons />
            </HeaderWrapper>
            {primaryOptions.map((item) => (
                <React.Fragment key={item.primaryKey}>
                    {<TicketViewOptions name={item.name} route={item.route} />}
                </React.Fragment>
            ))}
            <HorizontalSeparator />
            {
                secondaryOptions.map((item) => (
                    <React.Fragment key={item.primaryKey}>
                        <TicketViewOptions {...item} />
                    </React.Fragment>
                ))
            }
        </ViewsWrapper>
    )
};

interface ITicketViewOptionsProps {
    name: string;
    route: string;
    disabled?: boolean;
    renderIcon?: () => React.ReactElement;
}

const TicketViewOptions = (props: ITicketViewOptionsProps) => {
    const { name, route, disabled, renderIcon } = props;
    const navigate = useNavigate();
    const match = useMatch(`/tickets/:route`);
    const selectedMenu = match?.params.route;
    const isOptionSelected = React.useMemo(() => selectedMenu === route, [route, selectedMenu]);

    const onLinkClick = React.useCallback(() => {
        navigate(route);
    }, [navigate, route]);

    return (
        <Wrapper onClick={onLinkClick} $isOptionSelected={isOptionSelected} $disabled={disabled}>
            <OptionWrapper gap={'10px'}>
                {renderIcon ? renderIcon() : <></>}
                <Typography variant="h6" color="inherit">
                    {name}
                </Typography>
            </OptionWrapper>
        </Wrapper>
    )
}