import { Close, Panorama } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { isImageMimeType } from 'modules/chats/components/chat-conversations/conversations/preview-file-content';
import { useState } from 'react';
import styled from 'styled-components';

import { IAttachments } from '../../../apis';

const StyledCloseBtn = styled(IconButton)`
  && {
    :&hover {
      background-color: rgb(229 222 222 / 40%);
    }
  }
`;

const PreviewFile = (props: {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  contentType: string;
}) => {
  const { onClose, open, fileUrl, contentType } = props;

  const renderBasedOnFileType = () => {
    if (isImageMimeType(contentType)) {
      return (
        <FlexBox
          style={{ overflow: 'auto', textAlign: 'center' }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <img
            src={fileUrl}
            alt="Description"
            style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
          />
        </FlexBox>
      );
    }
    return (
      <object data={fileUrl} style={{ height: '100%' }}>
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
      PaperProps={{
        sx: { height: '-webkit-fill-available', background: '#2f2f2fba' },
      }}
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

export const PreviewFileContainer = (
  props: Pick<IAttachments, 'fileUrl' | 'contentType'>
) => {
  const { fileUrl, contentType } = props;
  const [showFilePreview, setFilePreviewDisplay] = useState(false);

  const toggleViewer = () => setFilePreviewDisplay((prevValue) => !prevValue);

  const onPreviewClick = () => {
    toggleViewer();
  };

  return (
    <>
      <PreviewFile
        open={showFilePreview}
        onClose={toggleViewer}
        fileUrl={fileUrl}
        contentType={contentType}
      />
      <CustomIconButton
        onClick={onPreviewClick}
        tooltipProps={{ title: 'Preview File' }}
        iconComponent={<Panorama />}
      />
    </>
  );
};
