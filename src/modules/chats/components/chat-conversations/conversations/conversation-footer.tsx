import { Close, Send } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useNotifications } from 'lib';
import { KeyCodes } from 'lib/enums';
import { useAppSelector } from 'lib/hooks';
import {
  CancelButton,
  FlexBox,
  IFileInfo,
  RoundedSendButton,
  TextArea,
  parseFileInfo,
} from 'lib/ui-ux';
import { NativeFileUpload } from 'lib/ui-ux/file-upload/native-file-upload-field';
import { getAllFilesInfo } from 'lib/ui-ux/file-upload/utils';
import { usePresignedURL } from 'modules/chats/apis/presigned-url';
import { useUploadFileToS3 } from 'modules/chats/apis/upload-file-s3';
import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { isImageMimeType } from './preview-file-content';

interface IConversationFooterProps {
  is_expired: boolean;
  onSendAction: (newConversation: {
    message: string;
    mediaURL?: string;
    type?: string;
    caption?: string;
    filename?: string;
  }) => Promise<{ status: boolean }>;
}

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  padding: 15px;
`;

const ContentArea = styled(FlexBox)`
  border-radius: 20px;
  padding: 10px;
  background: white;
  box-shadow: 0px 10px 50px 12px rgba(0, 0, 0, 0.1);
`;

interface IFileInfoState {
  original: File[];
  parsedFile: IFileInfo[];
}

const UploadedFilePreview = (
  props: {
    toggleFileDisplay: () => void;
    filePreviewDisplay: boolean;
    fileInfo: IFileInfoState;
  } & Pick<IConversationFooterProps, 'onSendAction'>
) => {
  const { filePreviewDisplay, fileInfo, toggleFileDisplay, onSendAction } =
    props;
  const [textareaValue, setTextAreaValue] = React.useState('');
  const { mutateAsync: getPresignedURL, isLoading } = usePresignedURL();
  const { mutateAsync: uploadFileToS3, isLoading: fileUploadS3Loading } =
    useUploadFileToS3();
  const { showNotification } = useNotifications();
  const isDisabled = isLoading || fileUploadS3Loading;

  const uploadFileToServer = useCallback(async () => {
    const res = await getPresignedURL({
      content_type: fileInfo.original[0].type,
    });
    const s3Response = await uploadFileToS3({
      presignedUrl: res.url,
      file: fileInfo.original[0],
    });
    try {
      if (s3Response.ok) {
        await onSendAction({
          message: '',
          mediaURL: res.media_url,
          type: fileInfo.original[0].type,
          caption: textareaValue,
          filename: fileInfo.original[0].name,
        }).finally(() => toggleFileDisplay());
      }
    } catch (e) {
      showNotification({
        message: 'Failed to send the file and message' + e,
        type: 'error',
      });
      toggleFileDisplay();
      return Promise.reject();
    }
  }, [
    fileInfo.original,
    getPresignedURL,
    onSendAction,
    showNotification,
    textareaValue,
    toggleFileDisplay,
    uploadFileToS3,
  ]);

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (ev) => {
        if (ev.key === KeyCodes.EnterKey && !ev.shiftKey) {
          uploadFileToServer();
          ev.preventDefault();
        }
      },
      [uploadFileToServer]
    );

  const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    React.useCallback((ev) => {
      setTextAreaValue(ev.target.value);
    }, []);

  const renderBasedOnFileType = () => {
    if (isImageMimeType(fileInfo.parsedFile[0]!.type)) {
      return (
        <FlexBox
          style={{ overflow: 'auto', textAlign: 'center' }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <img
            src={fileInfo.parsedFile[0].content! as string}
            alt="Description"
            style={{ display: 'block', maxWidth: '100%', height: '100%' }}
          />
        </FlexBox>
      );
    }
    return (
      <object
        data={fileInfo.parsedFile[0].content! as string}
        style={{ height: '100%', width: '100%' }}
      >
        <p>Alternative text</p>
      </object>
    );
  };

  return (
    <Dialog
      open={filePreviewDisplay}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={toggleFileDisplay}
      maxWidth="lg" // Set the dialog width
      fullWidth // Ensure it spans the full width
      PaperProps={{ sx: { height: '-webkit-fill-available' } }}
    >
      <DialogTitle id="alert-dialog-title">
        Preview
        <IconButton
          aria-label="close"
          onClick={toggleFileDisplay}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)', // Adjust height (64px = Title + Padding)
          padding: 0,
        }}
      >
        <div style={{ height: 'calc(100% - 56px)', width: '100%' }}>
          {renderBasedOnFileType()}
        </div>
        <TextArea
          onChange={onTextChange}
          value={textareaValue}
          onKeyDown={onKeyDown}
          placeholder="Shift + Enter to add a new line"
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={toggleFileDisplay} variant="text" />
        <RoundedSendButton
          onClick={uploadFileToServer}
          disabled={isDisabled}
          endIcon={
            isDisabled ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              <Send />
            )
          }
          variant="contained"
        >
          Send
        </RoundedSendButton>
      </DialogActions>
    </Dialog>
  );
};

export const ConversationFooter = (props: IConversationFooterProps) => {
  const { is_expired, onSendAction } = props;
  const [textareaValue, setTextAreaValue] = React.useState('');
  const [filePreviewDisplay, setFilePreviewDisplay] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState<IFileInfoState>({
    original: [],
    parsedFile: [],
  });
  const form = useForm();
  const { t } = useTranslation();
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { showNotification } = useNotifications();
  const toggleFileDisplay = () =>
    setFilePreviewDisplay((prevValue) => !prevValue);

  const onFileUpload = React.useCallback(
    async (args: File[]) => {
      if (args.length) {
        const file = args[0]; // Get the selected file

        const maxSizeInMB = 20;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
          showNotification({
            message: `The file is too large. Please upload a file smaller than ${maxSizeInMB}MB.`,
            type: 'error',
          });
        } else {
          const result = (await getAllFilesInfo(args, 'readAsDataURL')).map(
            parseFileInfo
          );

          setFileInfo({
            original: args,
            parsedFile: result,
          });
          toggleFileDisplay();
        }
      }
    },
    [showNotification]
  );

  const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    React.useCallback((ev) => {
      setTextAreaValue(ev.target.value);
    }, []);

  const onSendClick = React.useCallback(() => {
    if (textareaValue.length) {
      onSendAction({ message: textareaValue, type: 'text' });
      setTextAreaValue('');
    }
  }, [onSendAction, textareaValue]);

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (ev) => {
        if (ev.key === KeyCodes.EnterKey && !ev.shiftKey) {
          onSendClick();
          ev.preventDefault();
        }
      },
      [onSendClick]
    );

  const controlDisabled = useMemo(
    () => chatDetails?.is_conversation_closed || is_expired,
    [chatDetails?.is_conversation_closed, is_expired]
  );

  return (
    <FormProvider {...form}>
      <FooterWrapper>
        <ContentArea flexDirection="column" width="100%" gap={'5px'}>
          <TextArea
            onChange={onTextChange}
            value={textareaValue}
            onKeyDown={onKeyDown}
            disabled={controlDisabled}
            placeholder={
              controlDisabled
                ? 'Conversation expired'
                : 'Shift + Enter to add a new line'
            }
          />
          <FlexBox justifyContent="space-between" padding="0px 10px 10px">
            <NativeFileUpload
              onChange={onFileUpload}
              disabled={controlDisabled}
            />
            <FlexBox gap={'10px'} alignItems="center">
              {is_expired ? (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={t('expired')}
                  color="error"
                  variant="outlined"
                  size="medium"
                />
              ) : null}
              <RoundedSendButton
                variant="contained"
                size="small"
                disabled={controlDisabled}
                endIcon={<Send />}
                onClick={onSendClick}
              >
                {t('send')}
              </RoundedSendButton>
            </FlexBox>
          </FlexBox>
        </ContentArea>
      </FooterWrapper>
      {filePreviewDisplay ? (
        <UploadedFilePreview
          filePreviewDisplay={filePreviewDisplay}
          toggleFileDisplay={toggleFileDisplay}
          onSendAction={onSendAction}
          fileInfo={fileInfo}
        />
      ) : null}
    </FormProvider>
  );
};
