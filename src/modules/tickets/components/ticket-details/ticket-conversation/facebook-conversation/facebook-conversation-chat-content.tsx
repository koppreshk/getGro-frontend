import React, { useMemo } from "react";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { ITicketConversation } from "modules/tickets/apis";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { DateTime } from "luxon";
import styled, { css } from "styled-components";


const Content = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    background-color: ${({ $isCustomerQuery }) => $isCustomerQuery ? '#efefef' : '#009dff'};
    padding: 10px;
    border-radius: ${({ $isCustomerQuery }) => $isCustomerQuery ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};

    box-shadow: rgba(0, 0, 0, 0.15) 1px 1px 3px 0px;
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

interface IFacebookChatContentProps extends Pick<ITicketConversation, 'agentName' | 'customerName'> {
    content: {
        custumerQuery?: string,
        agentQuery?: string
        agtMsgDeliveryStatus?: string;
        date: string;
    };
}

export const FacebookConversationChatContent = (props: IFacebookChatContentProps) => {
    const { content, agentName, customerName } = props;
    const isCustomerQuery = content.custumerQuery !== undefined;
    const query = content.custumerQuery ? content.custumerQuery : content.agentQuery;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(isCustomerQuery ? customerName : agentName), [agentName, customerName, isCustomerQuery]);

    React.useEffect(() => {
        containerRef?.current && containerRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <Wrapper gap="10px" alignItems="center" ref={containerRef} $isCustomerQuery={isCustomerQuery} flexDirection={isCustomerQuery ? 'row' : 'row-reverse'}>
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>
                {getInitialsByName(isCustomerQuery ? customerName : agentName)}
            </Avatar>
            <Content $isCustomerQuery={isCustomerQuery} maxWidth="50%" flexDirection="column" gap="10px">
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginRight: '16px', color: `${!isCustomerQuery ? '#f7f7f7' : '#3b4455'}` }} >
                    {query}
                </Typography>
                {!isCustomerQuery ?
                    <FlexBox justifyContent="flex-end" gap="5px" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#f7f7f7' }}>
                            {DateTime.fromISO(content.date).toLocaleString(DateTime.TIME_24_SIMPLE)}
                        </Typography>
                        {
                            content.agtMsgDeliveryStatus === 'sent' ?
                                <Typography variant="subheading2" sx={{ color: '#f7f7f7' }}>Sent</Typography>
                                :
                                <Typography variant="subheading2" sx={{ color: '#f7f7f7' }}>Read</Typography>
                        }
                    </FlexBox>
                    :
                    <FlexBox justifyContent="flex-end" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#8696a0' }}>
                            {DateTime.fromISO(content.date).toLocaleString(DateTime.TIME_24_SIMPLE)}
                        </Typography>
                    </FlexBox>}
            </Content>
        </Wrapper>
    )
}
