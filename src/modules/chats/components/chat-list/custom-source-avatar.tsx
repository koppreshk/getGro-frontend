import { Badge, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useSourceIcon } from "modules/tickets/hooks";
import styled from "styled-components";
import { ChatItemProps } from "./chat-item";

const SmallAvatar = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: 100%;
    padding: 1px;
`;

export const CustomSourceAvatar = (props: Pick<ChatItemProps, 'source' | 'customerName'>) => {
    const { customerName, source } = props;
    const getSourceIcon = useSourceIcon();

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <SmallAvatar>
                    {getSourceIcon(source, { width: '16px', height: '16px' })}
                </SmallAvatar>
            }
        >
            <Avatar sx={{ fontSize: '14px' }}>{customerName.slice(0, 2)}</Avatar>
        </Badge>
    )
}