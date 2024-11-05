import { Badge, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useSourceIcon } from "modules/tickets/hooks";
import styled from "styled-components";
import { ChatConversation } from "modules/chats/apis";

const SmallAvatar = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: 100%;
    padding: 1px;
`;

export const CustomSourceAvatar = (props: Pick<ChatConversation, 'chat_source' | 'customer_name'>) => {
    const { customer_name, chat_source } = props;
    const getSourceIcon = useSourceIcon();

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <SmallAvatar>
                    {getSourceIcon(chat_source, { width: '16px', height: '16px' })}
                </SmallAvatar>
            }
        >
            <Avatar sx={{ fontSize: '14px' }}>{customer_name.slice(0, 2)}</Avatar>
        </Badge>
    )
}