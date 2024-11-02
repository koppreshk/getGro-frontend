import { GridLayout } from "lib/ui-ux";
import { ChatListContainer } from "../containers";

export default function ChatLayoutPage() {
    return (
        <GridLayout $gridTemplateColumns={'1fr 2fr 1fr'} $height={'100%'}>
            <ChatListContainer />
        </GridLayout>
    )
}