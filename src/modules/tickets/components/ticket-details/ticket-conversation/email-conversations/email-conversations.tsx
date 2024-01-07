import { FlexBox, IChangeArgs } from "lib/ui-ux";
import { EmailCard } from "./email-card";
import { useCallback } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { IEmailConversations } from "./email-conversations-layout";

const EmailConversationsContainer = styled(FlexBox)`
  .email-card-container:last-child {
    border-bottom: none;
  }  
`;

interface IEmailConversationsProps {
    subject: string;
    isCollapsedAll: boolean;
    emailThreads: IEmailConversations[];
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
    onSetEmailThreads: (args: IEmailConversations[]) => void
}

export type IEmailFormFields = {
    'reply': {
        attachments: IChangeArgs;
        editor: string;
    };
    'forward': {
        attachments: IChangeArgs;
        editor: string;
        to: string[];
        bcc: string[];
        cc: string[];
    }
};

export const EmailConversations = (props: IEmailConversationsProps) => {
    const { emailThreads, onSetEmailThreads } = props;
    const formContext = useForm<IEmailFormFields>();

    const onSend = useCallback((args: IEmailConversations, linkedMessageId: string) => {
        const clonedEmailThreads = emailThreads.slice()
        clonedEmailThreads.splice(emailThreads.findIndex((item) => item.messageId === linkedMessageId) + 1, 0, args)
        onSetEmailThreads(clonedEmailThreads);
    }, [emailThreads, onSetEmailThreads])

    return (
        <FormProvider {...formContext}>
            <EmailConversationsContainer $width="100%" $height="calc(100% - 32px)" $flexDirection="column" $gap="20px" $overflowY="auto">
                {emailThreads.map((singleEmail, index) => <EmailCard key={index} emailProps={{ ...singleEmail, subject: props.subject }} onSend={onSend} onSingleEmailCollapseHandler={props.onSingleEmailCollapseHandler} />)}
            </EmailConversationsContainer>
        </FormProvider>
    )
}
