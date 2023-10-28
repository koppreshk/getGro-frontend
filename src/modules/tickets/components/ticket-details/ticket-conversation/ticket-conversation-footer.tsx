import React from "react";
import { FlexBox, TextArea } from "lib/ui-ux";
import { Send } from "@mui/icons-material";
import { Tabs, Tab, Button } from "@mui/material";


interface ITicketConversationFooterProps {
    onSendAction: (newConversation: {
        custumerQuery?: string;
        agentQuery?: string;
    }) => void;
}

export const TicketConversationFooter = (props: ITicketConversationFooterProps) => {
    const { onSendAction } = props;
    const [value, setValue] = React.useState(0);
    const [textareaValue, setTextAreaValue] = React.useState('');

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    const onSendClick = React.useCallback(() => {
        if (textareaValue.length) {
            onSendAction({ agentQuery: textareaValue });
            setTextAreaValue('');
        }
    }, [onSendAction, textareaValue]);

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            onSendClick();
            ev.preventDefault();
        }
    }, [onSendClick]);

    return (
        <FlexBox $flexDirection="column">
            <Tabs value={value} onChange={handleChange} aria-label="Tabs footer content">
                <Tab label="Reply" id="reply-tab" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
                <FlexBox $justifyContent="flex-end" $padding="0px 10px">
                    <Button variant="contained" endIcon={<Send />} onClick={onSendClick} >
                        Send
                    </Button>
                </FlexBox>
            </CustomTabPanel>
        </FlexBox>
    )
}

function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}