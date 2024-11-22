import { useMemo } from "react";
import { Badge, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useSourceIcon } from "modules/tickets/hooks";
import styled from "styled-components";
import { ChatConversation } from "modules/chats/apis";
import { chooseRandomColors } from "lib/utils";

const SmallAvatar = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: 100%;
    padding: 1px;
`;

export const CustomSourceAvatar = (props: Pick<ChatConversation, 'chat_source' | 'customer_name' | 'chat_type'>) => {
    const { customer_name, chat_source, chat_type } = props;
    const getSourceIcon = useSourceIcon();
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(customer_name), [customer_name]);

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <SmallAvatar>
                    {getSourceIcon(chat_type === 'instagram_message' ? chat_type : chat_source, { width: '16px', height: '16px' })}
                </SmallAvatar>
            }
        >
            <Avatar sx={{ fontSize: '14px', color: textColor, bgcolor: backgroundColor }}>{customer_name.slice(0, 2)}</Avatar>
        </Badge>
    )
}