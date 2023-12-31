import ReactQuill from "react-quill";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import styled from "styled-components";
import { Delete, Send } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox } from "lib/ui-ux";
import { FileUploadField } from "lib/form-fields";
import { IEmailFormFields } from "./email-conversations";
import { UploadedAttachmentsPreview } from "./uploaded-attachments-preview";
import { EmailHeaderOptions } from "./email-header-options";

interface IEmailEditorProps {
    from: string;
    editorValue: string;
    editorType: 'reply' | 'forward'
    showEmailHeaderOptions?: boolean;
    onCancelClick: () => void;
    onSendClick?: () => void;
    onEditorValueChange: (value: string) => void;
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .ql-toolbar, .ql-container {
        border-left: 0;
        border-right: 0;
    }
    .ql-container {
        min-height: 180px;
        border-bottom: 0px;
    }
    .ql-editor {
        padding: 12px 16px;
    }
`;

const StyledForwardCardContainer = styled(FlexBox)`
    border: 1px solid #ccc;
    border-radius: 16px;
    &:hover, &:focus-within {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
`;

export const RoundedSendButton = styled(Button)`
    &&{
        border-radius: 25px;
        padding: 6px 25px;

        .MuiButton-endIcon {
            margin-left: 12px;
        }
    }
`;

export const EmailEditor = (props: IEmailEditorProps) => {
    const { editorValue, from, showEmailHeaderOptions = false, editorType, onEditorValueChange, onCancelClick, onSendClick } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);
    const { watch } = useFormContext<IEmailFormFields>();
    const attachmets = watch(`${editorType}.attachments`);

    return (
        <FlexBox $gap="10px" >
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
            <StyledForwardCardContainer $flexDirection="column" $gap="10px" $width="calc(100% - 60px)">
                {showEmailHeaderOptions ? <EmailHeaderOptions editorType={editorType} /> : null}
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={editorValue}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onEditorValueChange} />
                </EditorContainer>
                <FlexBox $gap="8px" $padding="0px 16px" $flexWrap="wrap">
                    {attachmets?.selectedFiles.map((item) => (<UploadedAttachmentsPreview item={item} attachmets={attachmets} />))}
                </FlexBox>
                <FlexBox $justifyContent="space-between" $padding="0px 16px 10px">
                    <FlexBox $gap="5px">
                        <RoundedSendButton variant="contained" endIcon={<Send />} onClick={onSendClick}>
                            Send
                        </RoundedSendButton>
                        <FileUploadField name={`${editorType}.attachments`} multiple readMode="readAsDataURL" />
                    </FlexBox>
                    <IconButton onClick={onCancelClick}>
                        <Delete />
                    </IconButton>
                </FlexBox>
            </StyledForwardCardContainer>
        </FlexBox>
    )
}
