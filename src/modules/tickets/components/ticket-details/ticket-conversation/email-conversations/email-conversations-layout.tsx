import { useRef, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations } from "./email-conversations";
import { UnfoldMore, UnfoldLess, Print } from '@mui/icons-material';
import { IEmailThreadProps } from "./email-card";

const LayoutWrapper = styled(FlexBox)`
    padding: 15px 10px;
`;

const emailConversations = [{
    emailHTMLContent: `
    <div dir="ltr">Hi koppresh,<div><br></div><div>How are you doing today.&nbsp;fwefewf <b><i>e2r23</i></b></div><div><b><i>qwdq23 ef2f2</i></b></div><div><b>dewfefw wefwef&nbsp;</b></div><div><b><br></b></div><div><ol><li><b>hide&nbsp;ndoiwhedo&nbsp;wsdwoeid</b></li><li><b>djnwedn</b></li><li><b>kdnweiw kmdow</b></li></ol></div><div><b><br></b></div><div><b><u>fqwqwwefwefew efwef wef2ef</u></b></div><div><b><u><font size="6">wd2 ww klw</font></u></b></div><div><br></div><div>regards,</div><div>Siddarth m</div></div>
    `,
    from: 'Siddarth Menon',
    fromEmail: 'siddarth.menon@gmail.com',
    toEmail: 'koppresh@gmail.com',
    createdDate: '2023-12-12T08:51:28.132Z',
    threadId: '100',
    isCollapsed: true,
    containsAttachment: true
}, {
    emailHTMLContent: `<div id=":1pw" class="ii gt adO" jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc4NDk3ODA4NjA2MDUyMzAwMiJd; 4:WyIjbXNnLWE6ci0zODQ3ODgwMDA0OTMxNDA5NzgzIl0.">
    <div id=":1pu" class="a3s aiL ">
    <div dir="ltr">
        hello sid<br>you <b>bitch</b>!!!<div><i><br></i></div><div><i>fadfd</i></div><div><i><br></i></div><div><i>regards kops</i></div></div><div class="yj6qo ajU">
    </div>
    </div></div></div></div>`,
    from: 'Koppresh Putpak',
    fromEmail: 'koppresh@gmail.com',
    toEmail: 'siddarth.menon@gmail.com',
    createdDate: '2023-10-17T15:45:30.715Z',
    threadId: '101',
    isCollapsed: true
}];

export const EmailConversationLayout = () => {
    const subject = 'My order is delayed';
    const [emailThreads, setEmailThreads] = useState(emailConversations);
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    const onSetEmailThreads = (args: Omit<IEmailThreadProps, 'subject'>[]) => setEmailThreads(args);

    const onSingleEmailCollapseHandler = (args: { threadId: string, isCollapsed: boolean }) => {
        const modifiedEmailThreads = emailThreads.slice().map((item) => {
            if (item.threadId === args.threadId) {
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
                    <Typography variant="h5">Subject: {subject}</Typography>
                    <FlexBox>
                        {
                            isCollapsedAll ?
                                <Tooltip title={'Expand all'}>
                                    <IconButton onClick={onExpandAll} >
                                        <UnfoldMore />
                                    </IconButton>
                                </Tooltip> :
                                <Tooltip title={'Collapse all'}>
                                    <IconButton onClick={onCollapseAll}>
                                        <UnfoldLess />
                                    </IconButton>
                                </Tooltip>
                        }
                        <Tooltip title="Print all">
                            <IconButton onClick={onPrintHandler}>
                                <Print />
                            </IconButton>
                        </Tooltip>
                    </FlexBox>
                </FlexBox>
                <EmailConversations
                    subject={subject}
                    isCollapsedAll={isCollapsedAll}
                    emailThreads={emailThreads}
                    onSetEmailThreads={onSetEmailThreads}
                    onSingleEmailCollapseHandler={onSingleEmailCollapseHandler} />
            </LayoutWrapper>
        </>
    )
}