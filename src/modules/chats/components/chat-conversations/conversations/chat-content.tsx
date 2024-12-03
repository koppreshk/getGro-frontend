import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName, getTime } from "lib/utils";
import { Done, DoneAll } from '@mui/icons-material';
import { Message } from "modules/chats/apis";
import { AttachmentContent } from "./attachment-content";
import { useAppSelector } from "lib/hooks";

const Content = styled(FlexBox) <{ $isIncomingMessage: boolean, $source: string }>`
    background-color: ${({ $isIncomingMessage, $source }) => {
        if ($isIncomingMessage) {
            return '#fff';
        }
        else {
            switch ($source) {
                case 'instagram':
                    return '#6e2dff';
                case 'facebook':
                    return '#009dff'
                default: return '#d9fdd3'
            }
        }
    }};
    padding: 6px;
    border-radius: ${({ $isIncomingMessage }) => $isIncomingMessage ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`;

const TextMessage = styled(Typography) <{ $isIncomingMessage: boolean, $source: string }>`
    &&{
        white-space: pre-wrap;
        margin-right: 21px;
        color: ${({ $source, $isIncomingMessage }) => {
        if ($isIncomingMessage) {
            return '#3b4455'
        }
        else {
            switch ($source) {
                case 'instagram':
                    return '#f7f7f7';
                case 'facebook':
                    return '#f7f7f7'
                default: return '#3b4455'
            }
        }
    }};
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

const Wrapper = styled(FlexBox) <{ $isIncomingMessage: boolean }>`
    ${({ $isIncomingMessage }) => $isIncomingMessage ? animateClient : animateAgent};
`;

interface IChatContentProps {
    content: Message;
    customerName: string;
}

export const ChatContent = (props: IChatContentProps) => {
    const { content, customerName } = props;
    const { created_at, direction, replied_by, media_url, message, status, mime_type, message_type, caption, filename } = content;
    const isIncomingMessage = direction === 'incoming';
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(isIncomingMessage ? customerName : replied_by || 'NA'), [replied_by, customerName, isIncomingMessage]);
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    React.useEffect(() => {
        containerRef?.current && containerRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <Wrapper gap="10px" alignItems="center" ref={containerRef} $isIncomingMessage={isIncomingMessage} flexDirection={isIncomingMessage ? 'row' : 'row-reverse'}>
            <Avatar sx={{ fontSize: '14px', color: textColor, bgcolor: backgroundColor }}>
                {isIncomingMessage ? getInitialsByName(customerName) : getInitialsByName(replied_by ?? 'NA')}
            </Avatar>
            <Content $isIncomingMessage={isIncomingMessage} $source={chatDetails!.chat_source!} maxWidth="50%" flexDirection="column" >
                {message_type != 'text'
                    ? <AttachmentContent media_url={media_url} mime_type={mime_type} caption={caption} isIncomingMessage={isIncomingMessage} filename={filename}/>
                    : (
                        <TextMessage variant="body2" $source={chatDetails!.chat_source!} $isIncomingMessage={isIncomingMessage} >
                            {message}
                        </TextMessage>
                    )}
                {!isIncomingMessage
                    ? <FlexBox justifyContent="flex-end" gap="5px" alignItems="center">
                        <Typography variant="subheading2" sx={{ color: chatDetails!.chat_source === 'whatsapp' ? '#8696a0' : '#f7f7f7' }}>{getTime(created_at)}</Typography>
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
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    const IconComponent = agtMsgDeliveryStatus === 'sent' ? Done : DoneAll;
    return (
        <IconComponent sx={{ color: agtMsgDeliveryStatus === 'read' ? "#53bdeb" : chatDetails!.chat_source === 'whatsapp' ? '#8696a0' : '#f7f7f7', width: '16px', height: '16px' }} />
    )
}