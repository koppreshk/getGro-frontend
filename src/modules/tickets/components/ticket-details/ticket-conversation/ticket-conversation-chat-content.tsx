import React from "react";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { ITicketConversation } from "modules/tickets/apis";
import { getInitialsByName } from "lib/utils";

const Content = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    background-color: ${({ theme, $isCustomerQuery }) => $isCustomerQuery ? theme.pallete.white : theme.pallete.primaryPurple };
    padding: 10px;
    border-radius: ${({ $isCustomerQuery }) => $isCustomerQuery ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};

    .MuiTypography-body2 {
        color: ${({ theme, $isCustomerQuery }) => $isCustomerQuery ? 'unset' : theme.pallete.white };
    }
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

interface IChatContentProps extends Pick<ITicketConversation, 'agentName' | 'customerName'> {
    content: {
        custumerQuery?: string,
        agentQuery?: string
    };
}

export const TicketConversationChatContent = (props: IChatContentProps) => {
    const { content, agentName, customerName } = props;
    const isCustomerQuery = content.custumerQuery !== undefined;
    const query = content.custumerQuery ? content.custumerQuery : content.agentQuery;
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        containerRef?.current && containerRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <Wrapper $gap="10px" $alignItems="center" ref={containerRef} $isCustomerQuery={isCustomerQuery} $flexDirection={isCustomerQuery ? 'row' : 'row-reverse'}>
            <Avatar>{getInitialsByName(isCustomerQuery ? customerName : agentName)}</Avatar>
            <Content $isCustomerQuery={isCustomerQuery} $maxWidth="50%">
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }} >
                    {query}
                </Typography>
            </Content>
        </Wrapper>
    )
}
