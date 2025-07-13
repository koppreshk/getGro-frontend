import {
  Close,
  NavigateBefore,
  NavigateNext,
  Panorama,
} from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { isImageMimeType } from 'modules/chats/components/chat-conversations/conversations/preview-file-content';
import { useMemo, useState } from 'react';
import styledComponents from 'styled-components';

import { IAttachments } from '../../../apis';

const StyledCloseBtn = styledComponents(IconButton)`
  && {
    :hover {
      background-color: rgb(229 222 222 / 40%);
    }
  }
`;

const NavButton = styledComponents(IconButton)`
  && {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    width: fit-content;
    z-index: 20;
  }
`;

const PrevButton = styledComponents(NavButton)`
  && {
    left: 10px;
  }
`;

const NextButton = styledComponents(NavButton)`
  && {
    right: 10px;
  }
`;

const PreviewFile = (props: {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  contentType: string;
  attachments: IAttachments[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const {
    onClose,
    open,
    fileUrl,
    contentType,
    attachments,
    currentIndex,
    setCurrentIndex,
  } = props;

  const imageAttachments = useMemo(
    () => attachments.filter((a) => isImageMimeType(a.contentType)),
    [attachments]
  );

  const handleNext = () => {
    if (currentIndex < imageAttachments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: '-webkit-fill-available',
          background: '#2f2f2fba',
          position: 'absolute',
        },
      }}
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

      {isImageMimeType(contentType) && (
        <>
          <PrevButton
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="previous image"
          >
            <NavigateBefore fontSize="large" />
          </PrevButton>

          <NextButton
            onClick={handleNext}
            disabled={currentIndex === imageAttachments.length - 1}
            aria-label="next image"
          >
            <NavigateNext fontSize="large" />
          </NextButton>
        </>
      )}

      <FlexBox
        style={{
          overflow: 'auto',
          textAlign: 'center',
          position: 'relative', // ✅ Add this
        }}
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        {isImageMimeType(contentType) ? (
          <img
            src={fileUrl}
            alt="Preview"
            style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
          />
        ) : (
          <object data={fileUrl} style={{ height: '100%' }}>
            <p>Cannot preview file</p>
          </object>
        )}
      </FlexBox>
    </Dialog>
  );
};

export const PreviewFileContainer = (
  props: Pick<IAttachments, 'fileUrl' | 'contentType'> & {
    attachments: IAttachments[];
  }
) => {
  const { fileUrl, attachments } = props;
  const [showFilePreview, setFilePreviewDisplay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageAttachments = useMemo(
    () => attachments.filter((a) => isImageMimeType(a.contentType)),
    [attachments]
  );

  const toggleViewer = () => setFilePreviewDisplay((prev) => !prev);

  const onPreviewClick = () => {
    const initialIndex = imageAttachments.findIndex(
      (a) => a.fileUrl === fileUrl
    );
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
    toggleViewer();
  };

  return (
    <>
      <PreviewFile
        open={showFilePreview}
        onClose={toggleViewer}
        fileUrl={imageAttachments[currentIndex]?.fileUrl || ''}
        contentType={imageAttachments[currentIndex]?.contentType || ''}
        attachments={attachments}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <CustomIconButton
        onClick={onPreviewClick}
        tooltipProps={{ title: 'Preview File' }}
        iconComponent={<Panorama />}
      />
    </>
  );
};
