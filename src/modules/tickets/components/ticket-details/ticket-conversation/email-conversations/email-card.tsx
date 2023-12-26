import { useCallback, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import { Reply } from '@mui/icons-material/';
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getFormattedDate, getInitialsByName } from "lib/utils";
import { useAuth } from "modules/login";
import { EditorSection } from "./editor-section";
import { EmailPopoverMetadata } from "./email-popover-metadata";

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

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail, createdDate, threadId, subject, toEmail, isCollapsed }, onSingleEmailCollapseHandler, onSend } = props;
    const [showEditor, setShowEditor] = useState(false);
    const [editorValue, setEditorValue] = useState('');
    const newThreadId = useId();
    const { user } = useAuth();
    const toggleEditorView = useCallback(() => setShowEditor(!showEditor), [showEditor]);
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);

    const onReplyClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
        ev.stopPropagation();
        toggleEditorView();
    }

    const onEditorValueChange = useCallback((value: string) => {
        setEditorValue(value);
    }, []);

    const onSendClick = useCallback(() => {
        onSend({
            createdDate: DateTime.now().toISO(),
            emailHTMLContent: editorValue,
            from: user!.userName!,
            fromEmail: user!.userName!,
            threadId: newThreadId,
            toEmail: fromEmail,
            isCollapsed: isCollapsed
        }, threadId);
        toggleEditorView();
    }, [editorValue, fromEmail, isCollapsed, newThreadId, onSend, threadId, toggleEditorView, user]);

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
                                    {!isCollapsed ?
                                        <Tooltip title="Reply" arrow placement="right">
                                            <IconButton sx={{ padding: 0 }} onClick={onReplyClick}>
                                                <Reply />
                                            </IconButton>
                                        </Tooltip> : null}
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
                    showEditor ? <EditorSection onCancelClick={toggleEditorView} onSendClick={onSendClick} onChange={onEditorValueChange} from={from} editorValue={editorValue} /> : null
                }
            </FlexBox >
        </StyledEmailCardContainer>
    )
}
