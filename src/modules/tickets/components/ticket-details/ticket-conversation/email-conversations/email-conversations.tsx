import { FlexBox, IChangeArgs } from "lib/ui-ux";
import { EmailCard, IEmailThreadProps } from "./email-card";
import { useCallback } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";

const EmailConversationsContainer = styled(FlexBox)`
  .email-card-container:last-child {
    border-bottom: none;
  }  
`;

interface IEmailConversationsProps {
    subject: string;
    isCollapsedAll: boolean;
    emailThreads: Omit<IEmailThreadProps, 'subject'>[];
    onSingleEmailCollapseHandler: (args: {
        threadId: string;
        isCollapsed: boolean;
    }) => void
    onSetEmailThreads: (args: Omit<IEmailThreadProps, 'subject'>[]) => void
}

export type IEmailFormFields = {
    [key in 'reply' | 'forward']: {
        attachments: IChangeArgs;
    };
};

export const EmailConversations = (props: IEmailConversationsProps) => {
    const { emailThreads, onSetEmailThreads } = props;
    const formContext = useForm<IEmailFormFields>();

    const onSend = useCallback((args: Omit<IEmailThreadProps, 'subject'>, linkedThreadId: string) => {
        const clonedEmailThreads = emailThreads.slice()
        clonedEmailThreads.splice(emailThreads.findIndex((item) => item.threadId === linkedThreadId) + 1, 0, args)
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
