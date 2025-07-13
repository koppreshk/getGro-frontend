import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import {
  DownloadAttachmentsContainer,
  PreviewFileContainer,
} from 'modules/tickets/containers';
import { styled } from 'styled-components';

import { IEmailConversations } from './email-conversations-layout';

const FileType = styled(FlexBox)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #465365;
  color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox)`
  border: 1px solid ${(props) => props.theme.pallete.grayVariant5};
  background-color: ${(props) => props.theme.pallete.grayVariant5};
  border-radius: 6px;
  width: fit-content;
`;

const fileTypes = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'text/plain': 'txt',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/zip': 'zip',
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/tiff': 'tiff',
};

const getFileExtension = (contentType: string): string | undefined => {
  return fileTypes[
    contentType.split(';')[0].toLocaleLowerCase() as keyof typeof fileTypes
  ];
};

const StyledFlexBox = styled(FlexBox)`
  margin-left: 50px;
  @media print {
    margin: 0px;
  }
`;

export const DownloadAttachments = (
  props: Pick<IEmailConversations, 'attachments' | 'messageId'>
) => {
  const { attachments, messageId } = props;

  return (
    <StyledFlexBox gap="10px" flexWrap="wrap">
      {attachments.map((attachment) => (
        <AttachmentPreviewContainer
          gap="8px"
          alignItems="center"
          key={attachment.attachmentId}
        >
          <FileType alignItems="center" justifyContent="center">
            <Typography variant="caption" sx={{ color: 'inherit' }}>
              {(
                getFileExtension(attachment.contentType) ||
                attachment.contentType.split('/')[1]
              ).toUpperCase()}
            </Typography>
          </FileType>
          <Typography
            variant="body3"
            title={attachment.fileName}
            sx={{
              maxWidth: '120px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {attachment.fileName}
          </Typography>
          <FlexBox alignItems="center">
            <PreviewFileContainer
              fileUrl={attachment.fileUrl}
              contentType={attachment.contentType}
              attachments={attachments}
            />
            <DownloadAttachmentsContainer
              attachmentId={attachment.attachmentId}
              messageId={messageId}
              fileUrl={attachment.fileUrl}
              fileName={attachment.fileName}
            />
          </FlexBox>
        </AttachmentPreviewContainer>
      ))}
    </StyledFlexBox>
  );
};
