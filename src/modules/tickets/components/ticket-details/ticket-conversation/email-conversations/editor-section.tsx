import { useMemo } from "react";
import { Send, Delete } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import ReactQuill from "react-quill";
import styled from "styled-components";

interface IEditorSectionProps {
    from: string;
    editorValue: string;
    onCancelClick: () => void;
    onSendClick: () => void;
    onChange: (editorValue: string) => void
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: calc(100% - 50px);
        display: flex;
        flex-direction: column;
    }
    .quill:hover, :focus {
            border-radius: 16px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    .ql-toolbar {
        border-radius: 16px 16px 0px 0px;
    }
    .ql-container {
        border-radius: 0px 0px 16px 16px;
        min-height: 180px;
    }
`;

export const EditorSection = (props: IEditorSectionProps) => {
    const { from, editorValue, onCancelClick, onChange, onSendClick } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);

    return (
        <>
            <FlexBox $flexDirection="column" $height="auto" style={{ position: 'relative' }}>
                <EditorContainer $gap="10px" $width="calc(100% - 10px)">
                    <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
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