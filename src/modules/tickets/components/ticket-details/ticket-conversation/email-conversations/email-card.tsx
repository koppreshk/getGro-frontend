import { useCallback, useId, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { DateTime } from "luxon";
import { Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import { Delete, Reply, Send } from '@mui/icons-material/';
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { getFormattedDate, getInitialsByName } from "lib/utils";
import { useAuth } from "modules/login";

export interface IEmailThreadProps {
    emailHTMLContent: string;
    from: string;
    fromEmail: string;
    createdDate: string;
    threadId: string;
}
interface IEmailCardProps {
    emailProps: IEmailThreadProps;
    onSend: (args: IEmailThreadProps, linkedThreadId: string) => void;
}

const InnerHTML = styled.div`
    padding-left: 50px;
`;

const SubTextValue = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3}
    }
`;

const EditorContainer = styled(FlexBox)`
    .quill {
        width: inherit;
        display: flex;
        flex-direction: column;
    }
    .ql-toolbar {
        border-radius: 16px 16px 0px 0px;
    }
    .ql-container {
        border-radius: 0px 0px 16px 16px;
        min-height: 180px;
    }
`;

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail, createdDate, threadId }, onSend } = props;
    const [showEditor, setShowEditor] = useState(false);
    const [editorValue, setEditorValue] = useState('');
    const newThreadId = useId();
    const { user } = useAuth();

    const toggleEditorView = useCallback(() => setShowEditor(!showEditor), [showEditor]);

    const onEditorValueChange = useCallback((value: string) => {
        setEditorValue(value);
    }, []);

    const onSendClick = useCallback(() => {
        onSend({ createdDate: DateTime.now().toISO(), emailHTMLContent: editorValue, from: user!.userName!, fromEmail: user!.userName!, threadId: newThreadId }, threadId);
        toggleEditorView();
    }, [editorValue, newThreadId, onSend, threadId, toggleEditorView, user])

    return (
        <div>
            <FlexBox $flexDirection="column" $gap="12px" $justifyContent="center">
                <FlexBox $justifyContent="space-between" $width="100%">
                    <FlexBox $gap="10px" $height="40px">
                        <Avatar>{getInitialsByName(from)}</Avatar>
                        <FlexBox $flexDirection="column">
                            <Typography variant="h6" fontSize="16px">{from}</Typography>
                            <SubTextValue fontSize="12px">{fromEmail}</SubTextValue>
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
            <HorizontalSeparator $margin="20px 0px 0px 0px" />
        </div>
    )
}

interface IEditorSectionProps {
    from: string;
    editorValue: string;
    onCancelClick: () => void;
    onSendClick: () => void;
    onChange: (editorValue: string) => void
}

const EditorSection = (props: IEditorSectionProps) => {
    const { from, editorValue, onCancelClick, onChange, onSendClick } = props;
    return (
        <>
            <FlexBox $flexDirection="column" $height="auto" style={{ position: 'relative' }}>
                <EditorContainer $gap="10px" $width="calc(100% - 10px)">
                    <Avatar>{getInitialsByName(from)}</Avatar>
                    <ReactQuill
                        theme="snow"
                        value={editorValue}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onChange} />
                </EditorContainer>
                <FlexBox>
                    <IconButton onClick={onSendClick} color="primary" sx={{ position: 'absolute', top: '1px', right: '10px' }}>
                        <Send />
                    </IconButton>
                    <IconButton onClick={onCancelClick} sx={{ position: 'absolute', top: '1px', right: '50px' }}>
                        <Delete />
                    </IconButton>
                </FlexBox>
            </FlexBox>
        </>
    )
}