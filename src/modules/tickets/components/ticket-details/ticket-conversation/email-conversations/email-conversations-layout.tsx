import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material"
import { CustomIconButton, FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";
import { UnfoldMore, UnfoldLess, Print } from '@mui/icons-material';
import { Conversations, ITicketById } from "modules/tickets/apis";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

export interface IEmailConversations extends Conversations {
    isCollapsed: boolean
}

export const EmailConversationLayout = (props: { conversationsData: ITicketById }) => {
    const { conversationsData } = props;
    const { subject, conversations } = conversationsData;
    const casedConversation = conversations.map(item => ({ ...toCamelCasedKeysFromUnderScores(item), isCollapsed: true })) as IEmailConversations[];
    const [emailThreads, setEmailThreads] = useState(casedConversation);
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (casedConversation.length) {
            setEmailThreads(casedConversation);
        }
    }, [casedConversation.length]);

    const onPrintHandler = () => {
        if (containerRef.current && iframeRef.current) {
            const content = containerRef.current;
            const pri = iframeRef.current.contentWindow;
            if (pri) {
                pri.document.open();
                pri.document.write(content.innerHTML);
                pri.document.close();
                pri.focus();
                pri.print();
            }
        }
    }

    const onSingleEmailCollapseHandler = (args: { messageId: string, isCollapsed: boolean }) => {
        const modifiedEmailThreads = emailThreads.slice().map((item) => {
            if (item.messageId === args.messageId) {
                return {
                    ...item,
                    isCollapsed: args.isCollapsed
                }
            }
            return item;
        })!;
        setEmailThreads(modifiedEmailThreads)
    }

    const onExpandAll = () => setEmailThreads(emailThreads.slice().map((item) => ({ ...item, isCollapsed: false })));
    const onCollapseAll = () => setEmailThreads(emailThreads.slice().map((item) => ({ ...item, isCollapsed: true })));

    const isCollapsedAll = emailThreads.every((item) => item.isCollapsed);

    return (
        <>
            <iframe ref={iframeRef} id="ifmcontentstoprint" style={{ display: 'none' }} />
            <LayoutWrapper ref={containerRef} $flexDirection="column" $gap="10px" $width="100%" $height="calc(100% - 84px);">
                <FlexBox $justifyContent="space-between">
                    <Typography variant="h5">{subject}</Typography>
                    <FlexBox>
                        {
                            isCollapsedAll ?
                                <CustomIconButton tooltipProps={{ title: 'Expand all' }} iconComponent={<UnfoldMore />} onClick={onExpandAll} />
                                :
                                <CustomIconButton tooltipProps={{ title: 'Collapse all' }} iconComponent={<UnfoldLess />} onClick={onCollapseAll} />
                        }
                        <CustomIconButton tooltipProps={{ title: 'Print all' }} iconComponent={<Print />} onClick={onPrintHandler} />
                    </FlexBox>
                </FlexBox>
                <EmailConversations
                    subject={subject}
                    isCollapsedAll={isCollapsedAll}
                    emailThreads={emailThreads}
                    onSingleEmailCollapseHandler={onSingleEmailCollapseHandler} />
            </LayoutWrapper>
        </>
    )
}