import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNotifications } from "lib";
import { useUploadFileToS3 } from "modules/chats/apis/upload-file-s3";
import { KeyCodes } from "lib/enums";
import { CancelButton, FlexBox, IFileInfo, RoundedSendButton, TextArea, parseFileInfo } from "lib/ui-ux";
import { getAllFilesInfo } from "lib/ui-ux/file-upload/utils";
import { NativeFileUpload } from "lib/ui-ux/file-upload/native-file-upload-field";
import { usePresignedURL } from "modules/chats/apis/presigned-url";

interface IWhatsappFooterProps {
    onSendAction: (newConversation: { message: string; mediaURL?: string, type?: string, caption?: string, filename?: string }) => Promise<{ status: boolean }>;
}

const FooterWrapper = styled(FlexBox)`
    width: 100%;
    padding: 15px;
`;

const ContentArea = styled(FlexBox)`
    border-radius: 20px;
    padding: 10px;
    background: white;
    box-shadow: 0px 10px 50px 12px rgba(0,0,0,0.1);
`;

interface IFileInfoState {
    original: File[];
    parsedFile: IFileInfo[]
}

export const WhatsappFooter = (props: IWhatsappFooterProps) => {
    const { onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const [filePreviewDisplay, setFilePreviewDisplay] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState<IFileInfoState>({ original: [], parsedFile: [] });
    const form = useForm();
    const { t } = useTranslation();

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
                        <RoundedSendButton variant="contained" size="small" endIcon={<Send />} onClick={onSendClick} >
                            {t('send')}
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
    const { mutateAsync: getPresignedURL } = usePresignedURL();
    const { mutateAsync: uploadFileToS3 } = useUploadFileToS3();
    const { showNotification } = useNotifications();

    const uploadFileToServer = useCallback(async () => {
        const res = await getPresignedURL({ content_type: fileInfo.original[0].type });
        uploadFileToS3({
            presignedUrl: res.url,
            file: fileInfo.original[0]
        }).then(() => {
            return onSendAction({
                message: '',
                mediaURL: res.media_url,
                type: fileInfo.original[0].type,
                caption: textareaValue,
                filename: fileInfo.original[0].name
            })
        }).catch(() => showNotification({ message: 'Failed to send the file and message', type: 'error' }))
            .finally(() => toggleFileDisplay());

    }, [fileInfo.original, getPresignedURL, onSendAction, showNotification, textareaValue, toggleFileDisplay, uploadFileToS3])

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