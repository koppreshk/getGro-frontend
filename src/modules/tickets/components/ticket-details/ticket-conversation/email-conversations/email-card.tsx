import { useCallback, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import { Delete, Reply, Send } from '@mui/icons-material/';
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { getFormattedDate, getInitialsByName } from "lib/utils";

interface IEmailCardProps {
    emailProps: {
        emailHTMLContent: string;
        from: string;
        fromEmail: string;
        createdDate: string;
    }
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
    }
    .ql-toolbar {
        border-radius: 16px 16px 0px 0px;
    }
    .ql-container {
        border-radius: 0px 0px 16px 16px;
    }
`;

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { emailHTMLContent, from, fromEmail, createdDate } } = props;
    const [showEditor, setShowEditor] = useState(false);
    const [value, setValue] = useState('');
    const [, onSaveState] = useState('');

    const onReplyClick = useCallback(() => setShowEditor(!showEditor), [showEditor]);

    const onChange = useCallback((value: string) => {
        setValue(value);
    }, [])

    const onSendClick = useCallback(() => {
        onSaveState(value)
    }, [value])

    const onCancelClick = useCallback(() => {
        setShowEditor(!showEditor)
    }, [showEditor]);

    return (
        <>
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
                            <IconButton onClick={onReplyClick}>
                                <Reply />
                            </IconButton>
                        </Tooltip>
                    </FlexBox>
                </FlexBox>
                <InnerHTML dangerouslySetInnerHTML={{ __html: emailHTMLContent }} />
                {
                    showEditor ? <EditorSection onCancelClick={onCancelClick} onSendClick={onSendClick} onChange={onChange} from={from} value={value} /> : null
                }
            </FlexBox >
            <HorizontalSeparator />
        </>
    )
}

interface IEditorSectionProps {
    from: string;
    value: string;
    onCancelClick: () => void;
    onSendClick: () => void;
    onChange: (value: string) => void
}

const EditorSection = (props: IEditorSectionProps) => {
    const { from, value, onCancelClick, onChange, onSendClick } = props;
    return (
        <>
            <FlexBox $flexDirection="column" $height="auto" style={{ position: 'relative' }}>
                <EditorContainer $gap="10px" $width="calc(100% - 10px)">
                    <Avatar>{getInitialsByName(from)}</Avatar>
                    <ReactQuill
                        theme="snow"
                        value={value}
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