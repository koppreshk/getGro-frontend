import React from "react";
import { FlexBox, TextArea } from "lib/ui-ux";
import { Send } from "@mui/icons-material";
import { KeyCodes } from "lib/enums";
import { RoundedSendButton } from "./email-conversations/email-editor";

interface ITicketConversationFooterProps {
    onSendAction: (newConversation: {
        custumerQuery?: string;
        agentQuery?: string;
        date: string;
    }) => void;
}

export const TicketConversationFooter = (props: ITicketConversationFooterProps) => {
    const { onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    const onSendClick = React.useCallback(() => {
        if (textareaValue.length) {
            onSendAction({ agentQuery: textareaValue, date: new Date().toISOString() });
            setTextAreaValue('');
        }
    }, [onSendAction, textareaValue]);

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        if (ev.key === KeyCodes.EnterKey && !ev.shiftKey) {
            onSendClick();
            ev.preventDefault();
        }
    }, [onSendClick]);

    return (
        <FlexBox flexDirection="column">
            <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
            <FlexBox justifyContent="flex-end" padding="0px 10px 10px">
                <RoundedSendButton variant="contained" size="small" endIcon={<Send />} onClick={onSendClick} >
                    Send
                </RoundedSendButton>
            </FlexBox>
        </FlexBox>
    )
}
