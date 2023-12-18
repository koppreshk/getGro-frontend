import { FlexBox } from "lib/ui-ux";
import { EmailCard, IEmailThreadProps } from "./email-card";
import { useCallback, useState } from "react";
import styled from "styled-components";

const emailConversations = [{
    emailHTMLContent: `
    <div dir="ltr">Hi koppresh,<div><br></div><div>How are you doing today.&nbsp;fwefewf <b><i>e2r23</i></b></div><div><b><i>qwdq23 ef2f2</i></b></div><div><b>dewfefw wefwef&nbsp;</b></div><div><b><br></b></div><div><ol><li><b>hide&nbsp;ndoiwhedo&nbsp;wsdwoeid</b></li><li><b>djnwedn</b></li><li><b>kdnweiw kmdow</b></li></ol></div><div><b><br></b></div><div><b><u>fqwqwwefwefew efwef wef2ef</u></b></div><div><b><u><font size="6">wd2 ww klw</font></u></b></div><div><br></div><div>regards,</div><div>Siddarth m</div></div>
    `,
    from: 'Siddarth Menon',
    fromEmail: 'siddarth.menon@gmail.com',
    toEmail: 'koppresh@gmail.com',
    createdDate: '2023-12-12T08:51:28.132Z',
    threadId: '100'
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
    threadId: '101'
}];

const EmailConversationsContainer = styled(FlexBox)`
  div:last-child {
    border-bottom: none;
  }  
`;

export const EmailConversations = (props: { subject: string; isCollapsedAll: boolean }) => {
    const [emailThreads, setEmailThreads] = useState(emailConversations);

    const onSend = useCallback((args: Omit<IEmailThreadProps, 'subject'>, linkedThreadId: string) => {
        const clonedEmailThreads = emailThreads.slice()
        clonedEmailThreads.splice(emailThreads.findIndex((item) => item.threadId === linkedThreadId) + 1, 0, args)
        setEmailThreads(clonedEmailThreads);
    }, [emailThreads])

    return (
        <EmailConversationsContainer $width="100%" $height="calc(100% - 32px)" $flexDirection="column" $gap="20px" $overflowY="auto">
            {emailThreads.map((singleEmail, index) => <EmailCard key={index} emailProps={{ ...singleEmail, subject: props.subject }} onSend={onSend} isCollapsedAll={props.isCollapsedAll} />)}
        </EmailConversationsContainer>
    )
}
