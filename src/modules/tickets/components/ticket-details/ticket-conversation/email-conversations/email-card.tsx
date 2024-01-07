import { useCallback, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { Typography, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getFormattedDate, getInitialsByName } from "lib/utils";
import { useAuth } from "modules/login";
import { EmailPopoverMetadata } from "./email-popover-metadata";
import { EmailThreadOptions } from "./email-thread-options";
import { EmailEditor } from "./email-editor";
import { DownloadAttachments } from "./download-attachments";
import { useFormContext } from "react-hook-form";
import { IEmailFormFields } from "./email-conversations";
import { IEmailConversations } from "./email-conversations-layout";

interface IEmailCardProps {
    emailProps: IEmailConversations & { subject: string; };
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
    onSend: (args: IEmailConversations, linkedMessageId: string) => void}

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

const useEmailActionHelpers = () => {
    const [showEditor, setShowEditor] = useState(false);

    const toggleEditorView = useCallback(() => {
        setShowEditor(!showEditor);
    }, [showEditor]);

    return {
        showEditor,
        toggleEditorView
    }
}

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { htmlContent, from, fromEmail, createdAt, messageId, subject, toEmail, isCollapsed, attachments }, onSingleEmailCollapseHandler, onSend } = props;
    const newmessageId = useId();
    const { user } = useAuth();
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);
    const { showEditor: showReplyEditor, toggleEditorView: toggleReplyEditorView } = useEmailActionHelpers();
    const { showEditor, toggleEditorView } = useEmailActionHelpers();
    const { handleSubmit, setValue } = useFormContext<IEmailFormFields>();

    const onReplyClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        toggleReplyEditorView();
        showEditor && toggleEditorView();
    }, [showEditor, toggleEditorView, toggleReplyEditorView])

    const onForwardClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        setValue('forward.editor', htmlContent);
        toggleEditorView();
        showReplyEditor && toggleReplyEditorView();
    }, [htmlContent, setValue, showReplyEditor, toggleEditorView, toggleReplyEditorView])

    const onSendReply = useCallback((formValues: Pick<IEmailFormFields, 'reply'>) => {
        onSend({
            createdAt: DateTime.now().toISO(),
            htmlContent: formValues.reply.editor,
            from: user!.email!,
            fromEmail: user!.email!,
            messageId: newmessageId,
            toEmail: fromEmail,
            isCollapsed: isCollapsed,
            to: "",
            attachments: []
        }, messageId);
        toggleReplyEditorView();
    }, [fromEmail, isCollapsed, newmessageId, onSend, messageId, toggleReplyEditorView, user]);

    const onCardClick = () => onSingleEmailCollapseHandler({ messageId, isCollapsed: !isCollapsed });

    return (
        <StyledEmailCardContainer className="email-card-container">
            <FlexBox $flexDirection="column" $gap="12px" $justifyContent="center">
                <FlexBox style={{ cursor: 'pointer' }} $flexDirection="column" $width="100%" onClick={onCardClick}>
                    <FlexBox $gap="10px" $width="100%">
                        <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
                        <FlexBox $flexDirection="column" $width="calc(100% - 50px)">
                            <FlexBox $justifyContent="space-between">
                                <Typography variant="h6">{from}</Typography>
                                <FlexBox $gap="10px" $justifyContent="space-between" $alignItems="center">
                                    <SubTextValue variant="caption">{getFormattedDate(createdAt)}</SubTextValue>
                                    {!isCollapsed ? <EmailThreadOptions onReplyClick={onReplyClick} onForwardClick={onForwardClick} /> : null}
                                </FlexBox>
                            </FlexBox>
                            {
                                isCollapsed
                                    ? <StripedEmailContent variant="body3">{strip(htmlContent)}</StripedEmailContent>
                                    : <FlexBox $gap="4px" $alignItems="center">
                                        <SubTextValue fontSize="12px">to {toEmail.split('@')[0]}</SubTextValue>
                                        <EmailPopoverMetadata fromEmail={fromEmail} toEmail={toEmail} subject={subject} createdAt={createdAt} />
                                    </FlexBox>
                            }
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
                {!isCollapsed && <InnerHTML dangerouslySetInnerHTML={{ __html: htmlContent }} />}
                {!isCollapsed && attachments.length && <DownloadAttachments />}
                {
                    showReplyEditor ?
                        <EmailEditor
                            from={from}
                            editorType="reply"
                            onCancelClick={toggleReplyEditorView}
                            onSendClick={handleSubmit(onSendReply)}
                        /> : null
                }
                {
                    showEditor ?
                        <EmailEditor
                            from={from}
                            editorType="forward"
                            showEmailHeaderOptions
                            onCancelClick={toggleEditorView} />
                        : null
                }
            </FlexBox >
        </StyledEmailCardContainer>
    )
}
