import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { DateTime } from "luxon";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { Conversation } from "modules/tickets/apis";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { Done, DoneAll, Person } from '@mui/icons-material';

const Content = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    background-color: ${({ theme, $isCustomerQuery }) => $isCustomerQuery ? theme.pallete.white : '#d9fdd3'};
    padding: 6px;
    border-radius: ${({ $isCustomerQuery }) => $isCustomerQuery ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};

    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`;

const animateClient = css`
    animation: backInLeft .3s;
    @keyframes backInLeft {
        0% {
            transform: translateX(-20px) scale(0.7);
            opacity: 0.7;
        }

        80% {
            transform: translateX(0px) scale(0.7);
            opacity: 0.7;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const animateAgent = css`
    animation: backInRight .3s;
    @keyframes backInRight {
    0% {
        transform: translateX(20px) scale(0.7);
        opacity: 0.7;
    }

    80% {
        transform: translateX(0px) scale(0.7);
        opacity: 0.7;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
    }
`;

const Wrapper = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    ${({ $isCustomerQuery }) => $isCustomerQuery ? animateClient : animateAgent};
`;

interface IChatContentProps {
    content: Conversation;
    agentName: string | null;
    customerName: string;
}

export const WhatsAppChatContent = (props: IChatContentProps) => {
    const { content, agentName, customerName } = props;
    const isCustomerQuery = !content.is_agent_sent;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(isCustomerQuery ? customerName : agentName || 'NA'), [agentName, customerName, isCustomerQuery]);
    const agtMsgDeliveryStatus = content.read ? 'read' : content.delivered ? 'delivered' : 'sent';

    React.useEffect(() => {
        containerRef?.current && containerRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <Wrapper gap="10px" alignItems="center" ref={containerRef} $isCustomerQuery={isCustomerQuery} flexDirection={isCustomerQuery ? 'row' : 'row-reverse'}>
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>
                {isCustomerQuery ? getInitialsByName(customerName) : <Person />}
            </Avatar>
            <Content $isCustomerQuery={isCustomerQuery} maxWidth="50%" flexDirection="column" >
                {content.file_url ? <img src={content.file_url} loading="lazy" /> : null}
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginRight: '21px' }} >
                    {content.message}
                </Typography>
                {!isCustomerQuery
                    ? <FlexBox justifyContent="flex-end" gap="5px" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#8696a0' }}>{DateTime.fromISO(content.created_at).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                        <MessageDeliveryStatuses agtMsgDeliveryStatus={agtMsgDeliveryStatus!} />
                    </FlexBox> :
                    <FlexBox justifyContent="flex-end" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#8696a0' }}>{DateTime.fromISO(content.created_at).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                    </FlexBox>}
            </Content>
        </Wrapper>
    )
}

const MessageDeliveryStatuses = (props: { agtMsgDeliveryStatus: string }) => {
    const { agtMsgDeliveryStatus } = props;

    const Component = agtMsgDeliveryStatus === 'sent' ? Done : DoneAll;
    return (
        <Component sx={{ color: agtMsgDeliveryStatus === 'read' ? "#53bdeb" : '#8696a0', width: '16px', height: '16px' }} />
    )
}