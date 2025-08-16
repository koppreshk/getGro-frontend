import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
} from '@mui/material';

interface FilePreviewProps {
  files: { file: File }[];
  previewIndex: number | null;
  handleClosePreview: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const FilePreview = (props: FilePreviewProps) => {
  const { files, previewIndex, handleClosePreview, handlePrev, handleNext } =
    props;
  return (
    <Dialog
      open={previewIndex !== null}
      onClose={handleClosePreview}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#121212', // dark background
          color: 'white',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography sx={{ color: 'white' }}>
          {files[previewIndex ?? 0]?.file.name}
        </Typography>
        <IconButton onClick={handleClosePreview} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          textAlign: 'center',
          position: 'relative',
          backgroundColor: '#37383a', // match dialog background
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={previewIndex === 0}
          sx={{ position: 'absolute', left: 10, top: '50%', color: 'white' }}
        >
          <ChevronLeft />
        </IconButton>

        <img
          src={
            previewIndex !== null
              ? URL.createObjectURL(files[previewIndex].file)
              : ''
          }
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            borderRadius: 8,
          }}
        />

        <IconButton
          onClick={handleNext}
          disabled={previewIndex === files.length - 1}
          sx={{ position: 'absolute', right: 10, top: '50%', color: 'white' }}
        >
          <ChevronRight />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};
