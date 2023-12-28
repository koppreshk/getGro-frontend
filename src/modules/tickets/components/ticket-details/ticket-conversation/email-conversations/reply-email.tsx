import { useMemo } from "react";
import { Send, Delete } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { RoundedSendButton } from "./forward-email";

interface IReplyEmailProps {
    from: string;
    editorValue: string;
    onCancelClick: () => void;
    onSendClick: () => void;
    onChange: (editorValue: string) => void
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .ql-toolbar, .ql-container {
        border: 0;
        border-bottom: 1px solid #ccc;
    }
    .ql-container {
        min-height: 180px;
        border-bottom: 0px;
    }
    .ql-editor {
        padding: 12px 16px;
    }
`;

const StyledReplyCardContainer = styled(FlexBox)`
    border: 1px solid #ccc;
    border-radius: 16px;
    &:hover, &:focus-within {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
`;

export const ReplyEmail = (props: IReplyEmailProps) => {
    const { from, editorValue, onCancelClick, onChange, onSendClick } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);

    return (
        <FlexBox $gap="10px" >
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
            <StyledReplyCardContainer $flexDirection="column" $width="calc(100% - 60px)">
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={editorValue}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onChange} />
                </EditorContainer>
                <FlexBox $justifyContent="space-between" $padding="0px 16px 10px">
                    <RoundedSendButton variant="contained" endIcon={<Send />} onClick={onSendClick} >
                        Send
                    </RoundedSendButton>
                    <IconButton onClick={onCancelClick}>
                        <Delete />
                    </IconButton>
                </FlexBox>
            </StyledReplyCardContainer>
        </FlexBox>
    )
}