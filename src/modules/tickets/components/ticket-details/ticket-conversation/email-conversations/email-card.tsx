import { useCallback, useId, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import { Reply } from '@mui/icons-material/';
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate, getInitialsByName } from "lib/utils";
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
    subject: string;
}
interface IEmailCardProps {
    emailProps: IEmailThreadProps;
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


export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail, createdDate, threadId, subject, toEmail }, onSend } = props;
    const [showEditor, setShowEditor] = useState(false);
    const [editorValue, setEditorValue] = useState('');
    const newThreadId = useId();
    const { user } = useAuth();
    const toggleEditorView = useCallback(() => setShowEditor(!showEditor), [showEditor]);

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
            toEmail: fromEmail
        }, threadId);
        toggleEditorView();
    }, [editorValue, fromEmail, newThreadId, onSend, threadId, toggleEditorView, user])

    return (
        <StyledEmailCardContainer>
            <FlexBox $flexDirection="column" $gap="12px" $justifyContent="center">
                <FlexBox $justifyContent="space-between" $width="100%">
                    <FlexBox $gap="10px">
                        <Avatar>{getInitialsByName(from)}</Avatar>
                        <FlexBox $flexDirection="column">
                            <Typography variant="h6" fontSize="16px">{from}</Typography>
                            <FlexBox $gap="4px" $alignItems="center">
                                <SubTextValue fontSize="12px">to {toEmail.split('@')[0]}</SubTextValue>
                                <EmailPopoverMetadata fromEmail={fromEmail} toEmail={toEmail} subject={subject} createdDate={createdDate} />
                            </FlexBox>
                        </FlexBox>
                    </FlexBox>
                    <FlexBox $gap="10px" $alignItems="center">
                        <SubTextValue variant="body2">{getFormattedDate(createdDate)}</SubTextValue>
                        <Tooltip title="Reply" arrow placement="right">
                            <IconButton onClick={toggleEditorView}>
                                <Reply />
                            </IconButton>
                        </Tooltip>
                    </FlexBox>
                </FlexBox>
                <InnerHTML dangerouslySetInnerHTML={{ __html: emailHTMLContent }} />
                {
                    showEditor ? <EditorSection onCancelClick={toggleEditorView} onSendClick={onSendClick} onChange={onEditorValueChange} from={from} editorValue={editorValue} /> : null
                }
            </FlexBox >
        </StyledEmailCardContainer>
    )
}
