import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { ChatItem } from "./chat-item";

const ChatListWrapper = styled(FlexBox)`
    height: calc(100% - 65px);
    overflow: auto;
`;

export const ChatList = () => {
    return (
        <>
            <ChatListWrapper flexDirection="column">
                <ChatItem />
            </ChatListWrapper>
        </>
    )
}
