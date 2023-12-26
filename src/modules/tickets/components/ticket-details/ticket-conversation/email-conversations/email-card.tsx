import { useCallback, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { Typography, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getFormattedDate, getInitialsByName } from "lib/utils";
import { useAuth } from "modules/login";
import { ReplyEmail } from "./reply-email";
import { EmailPopoverMetadata } from "./email-popover-metadata";
import { EmailThreadOptions } from "./email-thread-options";
import { ForwardEmail } from "./forward-email";

export interface IEmailThreadProps {
    emailHTMLContent: string;
    from: string;
    fromEmail: string;
    toEmail: string;
    createdDate: string;
    threadId: string;
    isCollapsed: boolean;
    subject: string;
}
interface IEmailCardProps {
    emailProps: IEmailThreadProps;
    onSingleEmailCollapseHandler: (args: {
        threadId: string;
        isCollapsed: boolean;
    }) => void
    onSend: (args: Omit<IEmailThreadProps, 'subject'>, linkedThreadId: string) => void;
}

const InnerHTML = styled.div`
    padding-left: 50px;
`;

const SubTextValue = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3}
    }
`;

const StyledEmailCardContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.pallete.grayVariant1};
  padding-bottom: 20px;
`;

const StripedEmailContent = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`

function strip(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const useReplyEmail = () => {
    const [replyEditorValue, setReplyEditorValue] = useState('');
    const [showReplyEditor, setShowReplyEditor] = useState(false);

    const toggleReplyEditorView = useCallback(() => setShowReplyEditor(!showReplyEditor), [showReplyEditor]);
    const onReplyEditorValueChange = useCallback((value: string) => setReplyEditorValue(value), []);

    return {
        toggleReplyEditorView,
        onReplyEditorValueChange,
        showReplyEditor,
        replyEditorValue
    }
}

const useForwardEmail = () => {
    const [forwardEditorValue, setForwardEditorValue] = useState('');
    const [showForwardEditor, setShowForwardEditor] = useState(false);

    const toggleForwardEditorView = useCallback((emailContent?: string) => {
        setShowForwardEditor(!showForwardEditor);
        setForwardEditorValue(emailContent ?? '');
    }, [showForwardEditor]);

    const onForwardEditorValueChange = useCallback((value: string) => setForwardEditorValue(value), []);

    return {
        showForwardEditor,
        forwardEditorValue,
        onForwardEditorValueChange,
        toggleForwardEditorView
    }
}

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail, createdDate, threadId, subject, toEmail, isCollapsed }, onSingleEmailCollapseHandler, onSend } = props;
    const newThreadId = useId();
    const { user } = useAuth();
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);
    const { showReplyEditor, replyEditorValue, onReplyEditorValueChange, toggleReplyEditorView } = useReplyEmail();
    const { showForwardEditor, forwardEditorValue, toggleForwardEditorView, onForwardEditorValueChange } = useForwardEmail();

    const onReplyClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        toggleReplyEditorView();
    }, [toggleReplyEditorView])

    const onForwardClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        toggleForwardEditorView(emailHTMLContent);
    }, [emailHTMLContent, toggleForwardEditorView])

    const onSendClick = useCallback(() => {
        onSend({
            createdDate: DateTime.now().toISO(),
            emailHTMLContent: replyEditorValue,
            from: user!.userName!,
            fromEmail: user!.userName!,
            threadId: newThreadId,
            toEmail: fromEmail,
            isCollapsed: isCollapsed
        }, threadId);
        toggleReplyEditorView();
    }, [replyEditorValue, fromEmail, isCollapsed, newThreadId, onSend, threadId, toggleReplyEditorView, user]);

    const onCardClick = () => onSingleEmailCollapseHandler({ threadId, isCollapsed: !isCollapsed });

    return (
        <StyledEmailCardContainer>
            <FlexBox $flexDirection="column" $gap="12px" $justifyContent="center">
                <FlexBox style={{ cursor: 'pointer' }} $flexDirection="column" $width="100%" onClick={onCardClick}>
                    <FlexBox $gap="10px" $width="100%">
                        <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
                        <FlexBox $flexDirection="column" $width="calc(100% - 50px)">
                            <FlexBox $justifyContent="space-between">
                                <Typography variant="h6">{from}</Typography>
                                <FlexBox $gap="10px" $justifyContent="space-between" $alignItems="center">
                                    <SubTextValue variant="caption">{getFormattedDate(createdDate)}</SubTextValue>
                                    {!isCollapsed ? <EmailThreadOptions onReplyClick={onReplyClick} onForwardClick={onForwardClick} /> : null}
                                </FlexBox>
                            </FlexBox>
                            {
                                isCollapsed
                                    ? <StripedEmailContent variant="body3">{strip(emailHTMLContent)}</StripedEmailContent>
                                    : <FlexBox $gap="4px" $alignItems="center">
                                        <SubTextValue fontSize="12px">to {toEmail.split('@')[0]}</SubTextValue>
                                        <EmailPopoverMetadata fromEmail={fromEmail} toEmail={toEmail} subject={subject} createdDate={createdDate} />
                                    </FlexBox>
                            }
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
                {!isCollapsed && <InnerHTML dangerouslySetInnerHTML={{ __html: emailHTMLContent }} />}
                {
                    showReplyEditor ? <ReplyEmail onCancelClick={toggleReplyEditorView} onSendClick={onSendClick} onChange={onReplyEditorValueChange} from={from} editorValue={replyEditorValue} /> : null
                }
                {
                    showForwardEditor ? <ForwardEmail from={from} forwardEditorValue={forwardEditorValue} onForwardEditorValueChange={onForwardEditorValueChange} /> : null
                }
            </FlexBox >
        </StyledEmailCardContainer>
    )
}
