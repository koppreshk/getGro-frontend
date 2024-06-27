import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Typography, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { EmailPopoverMetadata } from "./email-popover-metadata";
import { EmailThreadOptions } from "./email-thread-options";
import { EmailEditor } from "./email-editor";
import { DownloadAttachments } from "./download-attachments";
import { useFormContext } from "react-hook-form";
import { IEmailFormFields } from "./email-conversations";
import { IEmailConversations } from "./email-conversations-layout";
import { useReplyToEmail } from "modules/tickets/apis";

interface IEmailCardProps {
    emailProps: IEmailConversations & { subject: string; };
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
}

const InnerHTML = styled.div`
    padding-left: 50px;
    @media print {
        padding: 0px;
    }
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
`;

const StyledFlex = styled(FlexBox)`
    width: calc(100% - 50px);
    @media print {
        width: 100%;
    }
`;

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
    const { emailProps: { htmlContent, from, fromEmail, createdAt, messageId, subject, toEmail, isCollapsed, attachments }, onSingleEmailCollapseHandler } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);
    const { showEditor: showReplyEditor, toggleEditorView: toggleReplyEditorView } = useEmailActionHelpers();
    const { showEditor, toggleEditorView } = useEmailActionHelpers();
    const { handleSubmit, setValue } = useFormContext<IEmailFormFields>();
    const { mutateAsync, isLoading: isMutationLoading } = useReplyToEmail();

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
        const attachments = formValues.reply.attachments?.selectedFiles.map((item) => ({ file_name: item.name, file_type: item.type, file_content: (item.content as string).split(',')[1] }));
        mutateAsync({
            htmlContent: formValues.reply.editor,
            messageId,
            attachments: attachments
        }).then(() => toggleReplyEditorView());
    }, [mutateAsync, messageId, toggleReplyEditorView]);

    const onCardClick = () => onSingleEmailCollapseHandler({ messageId, isCollapsed: !isCollapsed });

    return (
        <StyledEmailCardContainer className="email-card-container">
            <FlexBox flexDirection="column" gap="12px" justifyContent="center">
                <FlexBox style={{ cursor: 'pointer' }} flexDirection="column" width="100%" onClick={onCardClick}>
                    <FlexBox gap="10px" width="100%">
                        <Avatar className="no-print" sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from || fromEmail)}</Avatar>
                        <StyledFlex flexDirection="column">
                            <FlexBox justifyContent="space-between">
                                <Typography variant="h6">{from || fromEmail} <span className="print">{`<${fromEmail}>`}</span></Typography>
                                <FlexBox gap="10px" justifyContent="space-between" alignItems="center">
                                    <SubTextValue variant="caption">{(createdAt)}</SubTextValue>
                                    {!isCollapsed ? <EmailThreadOptions onReplyClick={onReplyClick} onForwardClick={onForwardClick} /> : null}
                                </FlexBox>
                            </FlexBox>
                            {
                                isCollapsed
                                    ? <StripedEmailContent variant="body3">{strip(htmlContent)}</StripedEmailContent>
                                    : <FlexBox gap="4px" alignItems="center">
                                        <SubTextValue fontSize="12px">to {toEmail.split('@')[0]} <span className="print">{`<${toEmail}>`}</span></SubTextValue>
                                        <EmailPopoverMetadata fromEmail={fromEmail} toEmail={toEmail} subject={subject} createdAt={createdAt} />
                                    </FlexBox>
                            }
                        </StyledFlex>
                    </FlexBox>
                </FlexBox>
                {!isCollapsed && <InnerHTML dangerouslySetInnerHTML={{ __html: htmlContent }} />}
                {!isCollapsed && attachments.length > 0 && <DownloadAttachments attachments={attachments} />}
                {
                    showReplyEditor ?
                        <EmailEditor
                            from={from || fromEmail}
                            editorType="reply"
                            isMutationLoading={isMutationLoading}
                            onCancelClick={toggleReplyEditorView}
                            onSendClick={handleSubmit(onSendReply)}
                        /> : null
                }
                {
                    showEditor ?
                        <EmailEditor
                            from={from || fromEmail}
                            editorType="forward"
                            showEmailHeaderOptions
                            onCancelClick={toggleEditorView} />
                        : null
                }
            </FlexBox >
        </StyledEmailCardContainer>
    )
}
