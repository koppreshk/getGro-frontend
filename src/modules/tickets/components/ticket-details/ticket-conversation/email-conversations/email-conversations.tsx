import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { FlexBox, IChangeArgs } from "lib/ui-ux";
import { EmailCard } from "./email-card";
import { IEmailConversations } from "./email-conversations-layout";

const EmailConversationsContainer = styled(FlexBox)`
  .email-card-container:last-child {
    border-bottom: none;
    margin-bottom: 80px;
  }
  padding-right: 10px;
`;

interface IEmailConversationsProps {
    subject: string;
    isCollapsedAll: boolean;
    emailThreads: IEmailConversations[];
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
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
    const { emailThreads } = props;
    const formContext = useForm<IEmailFormFields>();

    return (
        <FormProvider {...formContext}>
            <EmailConversationsContainer $width="100%" $height="calc(100% - 50px)" $flexDirection="column" $gap="20px" $overflowY="auto">
                {emailThreads.map((singleEmail, index) => <EmailCard key={index} emailProps={{ ...singleEmail, subject: props.subject }} onSingleEmailCollapseHandler={props.onSingleEmailCollapseHandler} />)}
            </EmailConversationsContainer>
        </FormProvider>
    )
}
