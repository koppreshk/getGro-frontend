import styled from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { ITicketConversation } from "modules/tickets/apis";

const Content = styled(FlexBox) <{ $isCustomerQuery: boolean }>`
    background-color: ${({ theme, $isCustomerQuery }) => $isCustomerQuery ? '#ffefe0' : theme.pallete.white};
    padding: 10px;
    border-radius: ${({ $isCustomerQuery }) => $isCustomerQuery ? '0px 6px 6px 6px' : '6px 0px 6px 6px'};
`;

const getInitialsByName = (name: string) => {
    const [firstName, lastName] = name.split(' ');
    return `${firstName[0]}${lastName ? lastName[0] : firstName[1]}`;
}

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

    return (
        <FlexBox $gap="10px" $alignItems="center" $flexDirection={isCustomerQuery ? 'row' : 'row-reverse'}>
            <Avatar>{getInitialsByName(isCustomerQuery ? customerName : agentName)}</Avatar>
            <Content $isCustomerQuery={isCustomerQuery} $maxWidth="50%">
                <Typography variant="body2">
                    {query}
                </Typography>
            </Content>
        </FlexBox>
    )
}
