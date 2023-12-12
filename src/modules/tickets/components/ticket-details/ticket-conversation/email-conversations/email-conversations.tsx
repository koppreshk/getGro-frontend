import { Avatar, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

const emailConversations = [{
    emailHTMLContent: `
    <div dir="ltr">Hi koppresh,<div><br></div><div>How are you doing today.&nbsp;fwefewf <b><i>e2r23</i></b></div><div><b><i>qwdq23 ef2f2</i></b></div><div><b>dewfefw wefwef&nbsp;</b></div><div><b><br></b></div><div><ol><li><b>hide&nbsp;ndoiwhedo&nbsp;wsdwoeid</b></li><li><b>djnwedn</b></li><li><b>kdnweiw kmdow</b></li></ol></div><div><b><br></b></div><div><b><u>fqwqwwefwefew efwef wef2ef</u></b></div><div><b><u><font size="6">wd2 ww klw</font></u></b></div><div><br></div><div>regards,</div><div>Siddarth m</div></div>
    `,
    from: 'Siddarth Menon',
    fromEmail: 'siddarth.menon@gmail.com'
}, {
    emailHTMLContent: `<div id=":1pw" class="ii gt adO" jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc4NDk3ODA4NjA2MDUyMzAwMiJd; 4:WyIjbXNnLWE6ci0zODQ3ODgwMDA0OTMxNDA5NzgzIl0.">
    <div id=":1pu" class="a3s aiL ">
    <div dir="ltr">
        hello sid<br>you <b>bitch</b>!!!<div><i><br></i></div><div><i>fadfd</i></div><div><i><br></i></div><div><i>regards kops</i></div></div><div class="yj6qo ajU">
    </div>
    </div></div></div></div>`,
    from: 'Koppresh Putpak',
    fromEmail: 'koppresh@gmail.com'
}]

export const EmailConversations = () => {
    return (
        <FlexBox $width="100%" $height="calc(100% - 32px)" $flexDirection="column" $gap="20px" $overflowY="auto">
            {emailConversations.map((singleEmail) => <EmailCard emailProps={singleEmail} />)}
        </FlexBox>
    )
}

const FromEmailValue = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3}
    }
`;

const InnerHTML = styled.div`
    padding-left: 50px;
`;

interface IEmailCardProps {
    emailProps: {
        emailHTMLContent: string;
        from: string;
        fromEmail: string;
    }
}
const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail } } = props;
    return (
        <FlexBox $flexDirection="column" $gap="12px" $justifyContent="center">
            <FlexBox $gap="10px" $height="40px">
                <Avatar>SM</Avatar>
                <FlexBox $flexDirection="column">
                    <Typography variant="h6" fontSize="16px">{from}</Typography>
                    <FromEmailValue fontSize="12px">{fromEmail}</FromEmailValue>
                </FlexBox>
            </FlexBox>
            <InnerHTML dangerouslySetInnerHTML={{ __html: emailHTMLContent }} />
        </FlexBox>
    )
}