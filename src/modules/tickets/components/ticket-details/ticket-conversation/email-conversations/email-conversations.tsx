import styled from "styled-components";
import { FlexBox, IChangeArgs } from "lib/ui-ux";
import { EmailCard } from "./email-card";
import { IEmailConversations } from "./email-conversations-layout";
import { EmailEditor } from "./email-editor";
import { useCallback } from "react";
import { useReplyToEmail } from "modules/tickets/apis";
import { useFormContext } from "react-hook-form";

const EmailConversationsContainer = styled(FlexBox)`
  .email-card-container:last-child {
    border-bottom: none;
  }
  padding-right: 10px;
`;

interface IEmailConversationsProps {
    subject: string;
    isCollapsedAll: boolean;
    emailThreads: IEmailConversations[];
    showReplyEditor: boolean,
    showEditor: boolean,
    threadId: string;
    toggleEditorView: () => void;
    toggleReplyEditorView: () => void;
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
}

export type IEmailFormFields = {
    'reply': {
        attachments?: IChangeArgs;
        editor: string;
    };
    'forward': {
        attachments?: IChangeArgs;
        editor: string;
        to: string[];
        bcc: string[];
        cc: string[];
    }
};

export const EmailConversations = (props: IEmailConversationsProps) => {
    const { emailThreads, showReplyEditor, showEditor, threadId, toggleEditorView, toggleReplyEditorView } = props;
    const { mutateAsync, isLoading: isMutationLoading } = useReplyToEmail();
    const { handleSubmit } = useFormContext<IEmailFormFields>();

    const onSendReply = useCallback((formValues: Pick<IEmailFormFields, 'reply'>) => {
        const attachments = formValues.reply.attachments?.selectedFiles.map((item) => ({ file_name: item.name, file_type: item.type, file_content: (item.content as string).split(',')[1] }));
        mutateAsync({
            htmlContent: formValues.reply.editor,
            messageId: emailThreads[emailThreads.length - 1].messageId,
            attachments: attachments,
            threadId: threadId
        }).then(() => toggleReplyEditorView());
    }, [mutateAsync, emailThreads, threadId, toggleReplyEditorView]);

    return (
        <div style={{ overflow: 'auto', height: '100%' }}>
            <EmailConversationsContainer width="100%" flexDirection="column" gap="20px">
                {emailThreads.map((singleEmail, index) => <EmailCard key={index} emailProps={{ ...singleEmail, subject: props.subject }} onSingleEmailCollapseHandler={props.onSingleEmailCollapseHandler} />)}
            </EmailConversationsContainer>
            {
                showReplyEditor ?
                    <EmailEditor
                        from={emailThreads[0].from || emailThreads[0].fromEmail}
                        editorType="reply"
                        isMutationLoading={isMutationLoading}
                        onCancelClick={toggleReplyEditorView}
                        onSendClick={handleSubmit(onSendReply)}
                    /> : null
            }
            {
                showEditor ?
                    <EmailEditor
                        from={emailThreads[0].from || emailThreads[0].fromEmail}
                        editorType="forward"
                        showEmailHeaderOptions
                        onCancelClick={toggleEditorView} />
                    : null
            }
        </div>
    )
}
