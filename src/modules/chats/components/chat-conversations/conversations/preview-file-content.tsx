import { Close, Panorama } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { useState } from 'react';
import styled from 'styled-components';

import { Message } from '../../../apis';

const StyledCloseBtn = styled(IconButton)`
  && {
    :&hover {
      background-color: rgb(229 222 222 / 40%);
    }
  }
`;

export function isImageMimeType(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

const PreviewFile = (props: {
  open: boolean;
  onClose: () => void;
  media_url: string;
  mime_type: string;
}) => {
  const { onClose, open, media_url, mime_type } = props;

  const renderBasedOnFileType = () => {
    if (isImageMimeType(mime_type)) {
      return (
        <FlexBox
          style={{ overflow: 'auto', textAlign: 'center' }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <img
            src={media_url}
            alt="Description"
            style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
          />
        </FlexBox>
      );
    }
    return (
      <object data={media_url} style={{ height: '100%' }}>
        <p>Alternative text</p>
      </object>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth={'lg'}
      PaperProps={{ sx: { height: '-webkit-fill-available' } }}
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignSelf: 'end',
          padding: '0 12px',
        }}
      >
        <StyledCloseBtn
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <Close />
        </StyledCloseBtn>
      </DialogTitle>
      {renderBasedOnFileType()}
    </Dialog>
  );
};

export const PreviewFileContent = (
  props: Pick<Message, 'media_url' | 'mime_type'>
) => {
  const { media_url, mime_type } = props;
  const [showFilePreview, setFilePreviewDisplay] = useState(false);

  const toggleViewer = () => setFilePreviewDisplay((prevValue) => !prevValue);

  const onDownloadClick = () => {
    toggleViewer();
  };

  return (
    <>
      {media_url && mime_type ? (
        <PreviewFile
          open={showFilePreview}
          onClose={toggleViewer}
          media_url={media_url}
          mime_type={mime_type}
        />
      ) : null}
      <CustomIconButton
        onClick={onDownloadClick}
        tooltipProps={{ title: 'Preview File' }}
        iconComponent={<Panorama />}
        disabled={!mime_type || !media_url}
      />
    </>
  );
};
