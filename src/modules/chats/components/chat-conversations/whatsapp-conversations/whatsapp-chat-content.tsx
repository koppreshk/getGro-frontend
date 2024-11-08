import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName, getTime } from "lib/utils";
import { Done, DoneAll, Person } from '@mui/icons-material';
import { Message } from "modules/chats/apis";
import { AttachmentContent } from "./attachment-content";

const Content = styled(FlexBox) <{ $isIncomingMessage: boolean }>`
    background-color: ${({ theme, $isIncomingMessage }) => $isIncomingMessage ? theme.pallete.white : '#d9fdd3'};
    padding: 6px;
    border-radius: ${({ $isIncomingMessage }) => $isIncomingMessage ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};
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

const Wrapper = styled(FlexBox) <{ $isIncomingMessage: boolean }>`
    ${({ $isIncomingMessage }) => $isIncomingMessage ? animateClient : animateAgent};
`;

interface IChatContentProps {
    content: Message;
    customerName: string;
}

export const WhatsAppChatContent = (props: IChatContentProps) => {
    const { content, customerName } = props;
    const { created_at, direction, replied_by, media_url, message, status, mime_type, message_type } = content;
    const isIncomingMessage = direction === 'incoming';
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(isIncomingMessage ? customerName : replied_by || 'NA'), [replied_by, customerName, isIncomingMessage]);

    React.useEffect(() => {
        containerRef?.current && containerRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <Wrapper gap="10px" alignItems="center" ref={containerRef} $isIncomingMessage={isIncomingMessage} flexDirection={isIncomingMessage ? 'row' : 'row-reverse'}>
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>
                {isIncomingMessage ? getInitialsByName(customerName) : <Person />}
            </Avatar>
            <Content $isIncomingMessage={isIncomingMessage} maxWidth="50%" flexDirection="column" >
                {message_type != 'text'
                    ? <AttachmentContent media_url={media_url} mime_type={mime_type} />
                    : (
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginRight: '21px' }} >
                            {message}
                        </Typography>
                    )}
                {!isIncomingMessage
                    ? <FlexBox justifyContent="flex-end" gap="5px" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#8696a0' }}>{getTime(created_at)}</Typography>
                        <MessageDeliveryStatuses agtMsgDeliveryStatus={status} />
                    </FlexBox> :
                    <FlexBox justifyContent="flex-end" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: '#8696a0' }}>{getTime(created_at)}</Typography>
                    </FlexBox>}
            </Content>
        </Wrapper>
    )
}

const MessageDeliveryStatuses = (props: { agtMsgDeliveryStatus: string }) => {
    const { agtMsgDeliveryStatus } = props;

    const IconComponent = agtMsgDeliveryStatus === 'sent' ? Done : DoneAll;
    return (
        <IconComponent sx={{ color: agtMsgDeliveryStatus === 'read' ? "#53bdeb" : '#8696a0', width: '16px', height: '16px' }} />
    )
}