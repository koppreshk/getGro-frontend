import React, { useCallback } from "react";
import { CustomTabPanel, FlexBox } from "lib/ui-ux"
import { TicketConversationHeader } from "./ticket-conversation-header";
import { useAppSelector } from "lib/hooks";
import {
    FacebookConversationsContainer,
    InstagramConversationsContainer,
    TelephonicConversationContainer,
    EmailConversationContainer,
    WhatsAppConversationContainer,
    TicketLinksContainer,
    TicketHistoryContainer
} from "modules/tickets/containers";
import { Tabs, Tab, styled as MUIStyled } from "@mui/material";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// const StyledTab = styled(Tab)`
//     &&{
//         padding: 12px 10px;
//         min-height: unset;
//         text-transform: unset;
//     }
// `;

interface StyledTabProps {
    label: string;
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = MUIStyled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
    background: '#f1f1f1'
});

const StyledTab = MUIStyled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
    '&.Mui-selected': {
        fontWeight: theme.typography.fontWeightMedium,
    },
}));

export interface ITicketConversationLayoutProps {
}

const LayoutWrapper = styled(FlexBox)`
    background-color: ${({ theme: { pallete } }) => pallete.white};
`;

export const TicketConversationLayout = () => {
    const ticketDetailsById = useAppSelector(state => state.tickets.ticketDetails);
    const ticketSource = ticketDetailsById && ticketDetailsById.source?.toLocaleLowerCase();
    const [value, setValue] = React.useState(0);
    const { t } = useTranslation();
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const renderConversations = React.useCallback(() => {
        switch (ticketSource) {
            case 'email':
                return <EmailConversationContainer />
            case 'ivr':
                return <TelephonicConversationContainer />
            case 'whatsapp':
                return <WhatsAppConversationContainer />
            case 'instagram':
                return <InstagramConversationsContainer />
            case 'facebook':
                return <FacebookConversationsContainer />
            default:
                return <></>
        }
    }, [ticketSource]);

    const renderLinks = useCallback(() => {
        return <TicketLinksContainer />
    }, [])

    const renderHistory = useCallback(() => {
        return <TicketHistoryContainer />
    }, [])

    return (
        <LayoutWrapper width="100%" flexDirection="column">
            <TicketConversationHeader ticketDetailsById={ticketDetailsById!} />
            <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
                sx={{ minHeight: 'unset' }}
            >
                <StyledTab label={t("modules.tickets.ticketDetails.interactions.conversations.label")} />
                <StyledTab label={t("modules.tickets.ticketDetails.interactions.links.label")} />
                <StyledTab label={t("modules.tickets.ticketDetails.interactions.history.label")} />
            </StyledTabs>
            {/* <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="ticket-tabs" sx={{ minHeight: 'unset' }}>
                <StyledTab label="Conversations" />
                <StyledTab label="Links" />
                <StyledTab label="History" />
            </Tabs> */}
            <div style={{ height: 'calc(100% - 114px)' }}>
                <CustomTabPanel value={value} index={0} height="100%">
                    {renderConversations()}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} height="100%">
                    {renderLinks()}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2} height="100%">
                    {renderHistory()}
                </CustomTabPanel>
            </div>
        </LayoutWrapper>
    )
}