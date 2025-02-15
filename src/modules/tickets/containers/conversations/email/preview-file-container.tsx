import { Close, Panorama } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { CustomIconButton } from 'lib/ui-ux';
import { useState } from 'react';

import { IAttachments } from '../../../apis';

const PreviewFile = (props: {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
}) => {
  const { onClose, open, fileUrl } = props;
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
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>
      <object data={fileUrl} style={{ height: '100%' }}>
        <p>Alternative text</p>
      </object>
    </Dialog>
  );
};

export const PreviewFileContainer = (props: Pick<IAttachments, 'fileUrl'>) => {
  const { fileUrl } = props;
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
      />
      <CustomIconButton
        onClick={onPreviewClick}
        tooltipProps={{ title: 'Preview File' }}
        iconComponent={<Panorama />}
      />
    </>
  );
};
