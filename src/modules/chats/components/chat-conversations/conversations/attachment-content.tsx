import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Typography } from '@mui/material';
import { StyledErrorMessage } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { Message } from 'modules/chats/apis';
import { styled } from 'styled-components';

import { PreviewFileContent } from './preview-file-content';

const FileType = styled(FlexBox)`
  height: 32px;
  padding: 8px;
  border-radius: 6px;
  background-color: #465365;
  color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox)<{
  $isIncomingMessage: boolean;
}>`
  border: 1px solid ${(props) => props.theme.pallete.grayVariant5};
  background-color: ${({ $isIncomingMessage }) =>
    $isIncomingMessage ? '#d8d9d880' : '#a6c3a180'};
  border-radius: 6px;
  width: fit-content;
`;

const ImagePreview = styled.img`
  border-radius: 6px;
  object-fit: cover;
`;

const fileTypes = {
  'audio/mpeg': 'audio',
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
  mime_type: 'video',
};

const getFileExtension = (contentType: string): string | undefined => {
  return fileTypes[contentType.toLowerCase() as keyof typeof fileTypes];
};

const isImageType = (mimeType: string) => mimeType.startsWith('image/');

export const AttachmentContent = (
  props: Pick<Message, 'media_url' | 'mime_type' | 'caption' | 'filename'> & {
    isIncomingMessage: boolean;
  }
) => {
  const {
    mime_type = 'image/jpeg',
    media_url,
    caption,
    isIncomingMessage,
    filename,
  } = props;

  if (!mime_type || !media_url) {
    return (
      <StyledErrorMessage
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <WarningAmberIcon />
        Media URL or MIME type unavailable
      </StyledErrorMessage>
    );
  }

  return (
    <FlexBox flexDirection="column" gap="5px">
      {isImageType(mime_type) ? (
        <>
          <ImagePreview src={media_url} alt={filename || 'image'} />
          {caption && (
            <Typography
              variant="body2"
              sx={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}
            >
              {caption}
            </Typography>
          )}
        </>
      ) : (
        <>
          <AttachmentPreviewContainer
            gap="8px"
            alignItems="center"
            $isIncomingMessage={isIncomingMessage}
          >
            <FileType alignItems="center" justifyContent="center">
              <Typography variant="caption" sx={{ color: 'inherit' }}>
                {getFileExtension(mime_type)?.toUpperCase() || 'NA'}
              </Typography>
            </FileType>
            <Typography
              variant="body3"
              title={filename || 'File'}
              sx={{
                maxWidth: '120px',
                minWidth: '80px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {filename ?? 'File'}
            </Typography>
            <FlexBox alignItems="center">
              <PreviewFileContent media_url={media_url} mime_type={mime_type} />
            </FlexBox>
          </AttachmentPreviewContainer>
          {caption && (
            <Typography
              variant="body2"
              sx={{ whiteSpace: 'pre-wrap', marginRight: '21px' }}
            >
              {caption}
            </Typography>
          )}
        </>
      )}
    </FlexBox>
  );
};
