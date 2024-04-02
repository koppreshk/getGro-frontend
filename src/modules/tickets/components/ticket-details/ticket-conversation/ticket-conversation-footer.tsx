import React, { useCallback } from "react";
import { FlexBox, IChangeArgs, TextArea } from "lib/ui-ux";
import { Send } from "@mui/icons-material";
import { KeyCodes } from "lib/enums";
import { RoundedSendButton } from "./email-conversations/email-editor";
import { FileUploadField } from "lib/form-fields";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useUploadFile } from "modules/tickets/apis";
import { useNotifications } from "lib";

interface ITicketConversationFooterProps {
    onSendAction: (newConversation: {
        message: string;
        fileUrl?: string;
    }) => void;
}

const FooterWrapper = styled(FlexBox)`
    border-top: ${({ theme }) => theme.semantics.standardBorder} ;
`;

export const TicketConversationFooter = (props: ITicketConversationFooterProps) => {
    const { onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const [filePreviewDisplay, setFilePreviewDisplay] = React.useState(false);
    const form = useForm();

    const toggleFileDisplay = () => setFilePreviewDisplay((prevValue) => !prevValue);

    const onFileUpload = React.useCallback(() => {
        toggleFileDisplay();
    }, [])

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    const onSendClick = React.useCallback(() => {
        if (textareaValue.length) {
            onSendAction({ message: textareaValue });
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
        <FormProvider {...form}>
            <FooterWrapper flexDirection="column" >
                <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
                <FlexBox justifyContent="space-between" padding="0px 10px 10px">
                    <FileUploadField name={'attachments'} multiple readMode="readAsDataURL" onFileUpload={onFileUpload} />
                    <RoundedSendButton variant="contained" size="small" endIcon={<Send />} onClick={onSendClick} >
                        Send
                    </RoundedSendButton>
                </FlexBox>
            </FooterWrapper>
            {filePreviewDisplay ?
                <UploadedFilePreview
                    filePreviewDisplay={filePreviewDisplay}
                    toggleFileDisplay={toggleFileDisplay}
                    onSendAction={onSendAction}
                    fileData={form.watch('attachments')!}
                /> : null}
        </FormProvider>
    )
}


const UploadedFilePreview = (props: { toggleFileDisplay: () => void, filePreviewDisplay: boolean; fileData: IChangeArgs } & ITicketConversationFooterProps) => {
    const { filePreviewDisplay, fileData, toggleFileDisplay, onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const { mutateAsync } = useUploadFile();
    const { showNotification } = useNotifications();
    const data = fileData!.selectedFiles[0].content as string;

    const uploadFileToServer = useCallback(() => {
        mutateAsync({
            contentType: fileData!.selectedFiles[0].type,
            file: data!.split(',')[1]
        }).then((res: { file_url: string }) => {
            onSendAction({ message: textareaValue, fileUrl: res.file_url });
        })
            .catch(() => showNotification({ message: 'Failed to send the file and message', type: 'error' }))
            .finally(() => toggleFileDisplay())
    }, [data, fileData, mutateAsync, onSendAction, showNotification, textareaValue, toggleFileDisplay])

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        if (ev.key === KeyCodes.EnterKey && !ev.shiftKey) {
            uploadFileToServer();
            ev.preventDefault();
        }
    }, [uploadFileToServer]);

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    return (
        <Dialog
            open={filePreviewDisplay}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={toggleFileDisplay}>
            <DialogTitle id="alert-dialog-title">
                Preview
            </DialogTitle>
            <DialogContent>
                <object data={fileData.selectedFiles[0].content! as string} type={fileData.selectedFiles[0].type} width="100%" height="100%">
                    <p>Alternative text</p>
                </object>
                <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleFileDisplay} variant="text">Cancel</Button>
                <RoundedSendButton onClick={uploadFileToServer} endIcon={<Send />} variant="contained">
                    Send
                </RoundedSendButton>
            </DialogActions>
        </Dialog>
    )
}