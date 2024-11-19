import React, { useMemo } from "react";
import { DateTime } from "luxon";
import { useMatch, useNavigate } from "react-router-dom";
import { Typography, } from "@mui/material";
import { SouthWest, NorthEast, AttachFile } from '@mui/icons-material';
import { FlexBox } from "lib/ui-ux";
import styled, { css, useTheme } from "styled-components";
import { CustomSourceAvatar } from "./custom-source-avatar";
import { ChatConversation } from "modules/chats/apis";
import { isToday, isYesterday } from "lib/utils";
import { useAppDispatch } from "lib/hooks";
import { setChatDetails } from "modules/chats/storage";

const ChatWrapper = styled(FlexBox) <{ $isChatActive: boolean }>`
    padding: 15px 10px 15px 15px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
    cursor: pointer;

    ${({ $isChatActive }) => $isChatActive && css`
        background-color: ${(props) => props.theme.pallete.purpleLight};
        border-left-width: 4px;
        border-style: solid;
        border-color: ${(props) => props.theme.pallete.primaryPurple};
        border-width: 0;
        border-left-width: thick;
    `}

    &:hover {
        background-color: ${(props) => props.$isChatActive ? props.theme.pallete.purpleLight : props.theme.pallete.grayVariant5};
    }
`;

const ChatContent = styled(FlexBox)`
    margin-left: 15px;
    width: calc(100% - 55px);
`;

const StyledTypography = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: ${(props) => props.theme.pallete.grayNeutral};
    }
`;

export const ChatItem = (props: ChatConversation) => {
    const { chat_source, created_at, customer_name, id, last_message } = props;

    const match = useMatch('/chat/:conversationId');
    const navigate = useNavigate();
    const { pallete } = useTheme();
    const dispatch = useAppDispatch();
    const convId = match?.params.conversationId;
    const isChatActive = useMemo(() => convId === id.toString(), [id, convId]);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (convId === id.toString() && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });

            dispatch(setChatDetails(props));
        }
    }, [convId, dispatch, id, props]);

    const onChatItemClick = () => {
        navigate(`${id}`);
    }
    const isoDate = DateTime.fromFormat(created_at, 'yyyy-LL-dd hh:mm a').toISO();
    const time = DateTime.fromISO(isoDate!).toFormat('hh:mm a');

    return (
        <ChatWrapper ref={ref} onClick={onChatItemClick} $isChatActive={isChatActive}>
            <FlexBox justifyContent="center" alignItems="center">
                <CustomSourceAvatar chat_source={chat_source} customer_name={customer_name} />
            </FlexBox>
            <ChatContent flexDirection="column" gap="4px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 'calc(100% - 125px)', textWrap: 'nowrap' }}>{customer_name}</Typography>
                    <FlexBox flexDirection="row" gap={'10px'} alignItems="flex-end">
                        <Typography variant="caption" title="Created At" sx={{ color: pallete.grayNeutral }}>{isToday(isoDate!) ? `Today, ${time}` : isYesterday(isoDate!) ? `Yesterday, ${time}` : created_at}</Typography>
                        {last_message?.direction === "incoming" ? <SouthWest titleAccess="Incoming" sx={{ width: '16px', height: '16px', color: pallete.grayNeutral }} /> : <NorthEast titleAccess="Outgoing" sx={{ width: '16px', height: '16px', color: pallete.grayNeutral }} />}
                    </FlexBox>
                </FlexBox>
                {last_message?.message_type === 'attachment' ?
                    <FlexBox>
                        <AttachFile sx={{ width: '16px', height: '16px', color: pallete.grayNeutral }} />
                        <StyledTypography variant="body2">Attachment</StyledTypography>
                    </FlexBox>
                    :
                    <StyledTypography variant="body2" title={last_message?.message}>{last_message?.message}</StyledTypography>
                }
            </ChatContent>
        </ChatWrapper>
    )
}
