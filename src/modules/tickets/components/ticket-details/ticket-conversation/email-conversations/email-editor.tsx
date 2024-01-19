import React from "react";
import { useFormContext } from "react-hook-form";
import { useMemo, useRef } from "react";
import styled from "styled-components";
import { Delete, Send } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox } from "lib/ui-ux";
import { FileUploadField, RichTextEditorField } from "lib/form-fields";
import { IEmailFormFields } from "./email-conversations";
import { UploadedAttachmentsPreview } from "./uploaded-attachments-preview";
import { EmailHeaderOptions } from "./email-header-options";
import { InsertTemplate } from "./insert-template";

interface IEmailEditorProps {
    from: string;
    editorType: 'reply' | 'forward'
    showEmailHeaderOptions?: boolean;
    isMutationLoading?: boolean;
    onCancelClick: () => void;
    onSendClick?: () => void;
}

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
    const { from, showEmailHeaderOptions = false, editorType, isMutationLoading } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);
    const { watch } = useFormContext<IEmailFormFields>();
    const attachmets = watch(`${editorType}.attachments`);
    const containerRef = useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (containerRef?.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <FlexBox gap="10px" >
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
            <StyledForwardCardContainer ref={containerRef} flexDirection="column" gap="10px" width="calc(100% - 60px)">
                <div>
                    {showEmailHeaderOptions ? <EmailHeaderOptions editorType={editorType} /> : null}
                    <RichTextEditorField name={`${editorType}.editor`} />
                    <FlexBox gap="8px" padding="0px 16px" flexWrap="wrap">
                        {attachmets?.selectedFiles.map((item) => (<UploadedAttachmentsPreview item={item} attachmets={attachmets} />))}
                    </FlexBox>
                </div>
                <EmailFooterOptions onCancelClick={props.onCancelClick} onSendClick={props.onSendClick} editorType={editorType} isMutationLoading={isMutationLoading} />
            </StyledForwardCardContainer>
        </FlexBox>
    )
}

const EmailFooterOptions = (props: Pick<IEmailEditorProps, 'onSendClick' | 'onCancelClick' | 'editorType' | 'isMutationLoading'>) => {
    const { editorType, isMutationLoading, onCancelClick, onSendClick } = props;
    return (
        <FlexBox justifyContent="space-between" padding="0px 16px 10px">
            <FlexBox gap="5px">
                <RoundedSendButton disabled={isMutationLoading} variant="contained" endIcon={isMutationLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : <Send />} title="Send" onClick={onSendClick}>
                    Send
                </RoundedSendButton>
                <FileUploadField name={`${editorType}.attachments`} multiple readMode="readAsDataURL" />
                <InsertTemplate editorType={editorType} />
            </FlexBox >
            <IconButton onClick={onCancelClick} title="Delete">
                <Delete />
            </IconButton>
        </FlexBox >
    )
}
