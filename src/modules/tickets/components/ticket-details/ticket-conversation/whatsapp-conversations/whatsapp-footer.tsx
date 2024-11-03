import React, { useCallback } from "react";
import { CancelButton, FlexBox, IFileInfo, TextArea, parseFileInfo } from "lib/ui-ux";
import { Send } from "@mui/icons-material";
import { KeyCodes } from "lib/enums";
import { RoundedSendButton } from "../email-conversations/email-editor";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useUploadFile } from "modules/tickets/apis";
import { useNotifications } from "lib";
import { NativeFileUpload } from "../../../../../../lib/ui-ux/file-upload/native-file-upload-field";
import { getAllFilesInfo } from "lib/ui-ux/file-upload/utils";

interface IWhatsappFooterProps {
    onSendAction: (newConversation: {
        message: string;
        fileUrl?: string;
        type: string;
    }) => void;
    isDisabled?: boolean;
}

const FooterWrapper = styled(FlexBox)`
    /* border-top: ${({ theme }) => theme.semantics.standardBorder} ; */
    position: absolute;
    width: 100%;
    padding: 15px;
    bottom: 0px;
`;

const ContentArea = styled(FlexBox)`
    border-radius: 20px;
    padding: 10px;
    background: white;
    /* box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px; */
    box-shadow: 0px 10px 50px 12px rgba(0,0,0,0.1);
`;

interface IFileInfoState {
    original: File[];
    parsedFile: IFileInfo[]
}
export const WhatsappFooter = (props: IWhatsappFooterProps) => {
    const { onSendAction, isDisabled } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const [filePreviewDisplay, setFilePreviewDisplay] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState<IFileInfoState>({ original: [], parsedFile: [] });
    const form = useForm();

    const toggleFileDisplay = () => setFilePreviewDisplay((prevValue) => !prevValue);

    const onFileUpload = React.useCallback(async (args: File[]) => {
        const result = (await getAllFilesInfo(args, 'readAsDataURL')).map(parseFileInfo);

        setFileInfo({
            original: args,
            parsedFile: result
        });
        toggleFileDisplay();
    }, [])

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    const onSendClick = React.useCallback(() => {
        if (textareaValue.length) {
            onSendAction({ message: textareaValue, type: 'text' });
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
            <FooterWrapper>
                <ContentArea flexDirection="column" width="100%">
                    <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
                    <FlexBox justifyContent="space-between" padding="0px 10px 10px">
                        <NativeFileUpload onChange={onFileUpload} />
                        <RoundedSendButton variant="contained" disabled={isDisabled} size="small" endIcon={<Send />} onClick={onSendClick} >
                            Send
                        </RoundedSendButton>
                    </FlexBox>
                </ContentArea>
            </FooterWrapper>
            {filePreviewDisplay ?
                <UploadedFilePreview
                    filePreviewDisplay={filePreviewDisplay}
                    toggleFileDisplay={toggleFileDisplay}
                    onSendAction={onSendAction}
                    fileInfo={fileInfo}
                /> : null}
        </FormProvider>
    )
}


const UploadedFilePreview = (props: { toggleFileDisplay: () => void, filePreviewDisplay: boolean; fileInfo: IFileInfoState } & IWhatsappFooterProps) => {
    const { filePreviewDisplay, fileInfo, toggleFileDisplay, onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const { mutateAsync } = useUploadFile();
    const { showNotification } = useNotifications();

    const uploadFileToServer = useCallback(() => {
        const formData = new FormData();
        formData.append("file", fileInfo.original[0]);
        formData.append('content_type', fileInfo.original[0].type);

        mutateAsync(formData).then((res: { file_url: string }) => {
            onSendAction({ message: textareaValue, fileUrl: res.file_url, type: 'image' });
        })
            .catch(() => showNotification({ message: 'Failed to send the file and message', type: 'error' }))
            .finally(() => toggleFileDisplay())
    }, [fileInfo.original, mutateAsync, onSendAction, showNotification, textareaValue, toggleFileDisplay])

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
                <object data={fileInfo.parsedFile[0].content! as string} type={fileInfo.parsedFile[0]!.type} width="100%" height="100%">
                    <p>Alternative text</p>
                </object>
                <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
            </DialogContent>
            <DialogActions>
                <CancelButton onClick={toggleFileDisplay} variant="text" />
                <RoundedSendButton onClick={uploadFileToServer} endIcon={<Send />} variant="contained">
                    Send
                </RoundedSendButton>
            </DialogActions>
        </Dialog>
    )
}