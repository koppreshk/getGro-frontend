import { DeleteOutline, Panorama } from '@mui/icons-material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, IconButton, Typography } from '@mui/material';
import { useNotifications } from 'lib';
import { StyledErrorMessage } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { generateId } from 'lib/utils';
import {
  useState,
  DragEvent,
  ChangeEvent,
  useRef,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { FilePreview } from './file-preview';

export interface IFile {
  file: File;
  id: string;
}

const FileType = styled(FlexBox)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #465365;
  color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox)`
  border: 1px solid #ccc;
  background-color: ${(props) => props.theme.pallete.white};
  border-radius: 6px;
  width: fit-content;
`;

const FileUploadDNDContainer = styled(FlexBox)<{ $isDragging: boolean }>`
  border: ${({ $isDragging, theme }) =>
    $isDragging
      ? `2px dashed ${theme.pallete.primaryPurple}`
      : '2px dashed #ccc'};
  border-radius: 8px;
  margin-bottom: 20px;
`;

interface UploadedFileProps {
  files: IFile[];
  onDeleteClick: (id: string) => void;
  onPreviewClick: (index: number) => void;
}

const UploadedFiles = (props: UploadedFileProps) => {
  const { files, onDeleteClick, onPreviewClick } = props;
  return (
    <FlexBox flexDirection="column" gap={'20px'}>
      <Typography>
        <Trans i18nKey="uploaded_files" />
      </Typography>
      {files.map((item, index) => (
        <AttachmentPreviewContainer
          key={`${item.file.name}-${index}`}
          gap="8px"
          alignItems="center"
        >
          <FileType alignItems="center" justifyContent="center">
            <Typography variant="caption" sx={{ color: 'inherit' }}>
              {item.file.name.split('.').pop()?.toUpperCase()}
            </Typography>
          </FileType>
          <Typography
            variant="body3"
            title={item.file.name}
            sx={{
              maxWidth: '320px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {item.file.name}
          </Typography>
          <IconButton onClick={() => onPreviewClick(index)}>
            <Panorama />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(item.id)}>
            <DeleteOutline />
          </IconButton>
        </AttachmentPreviewContainer>
      ))}
    </FlexBox>
  );
};

interface FileUploadDNDProps {
  files: IFile[];
  error: string | null;
  className?: string;
  accept?: string;
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export const FileUploadDND = (props: FileUploadDNDProps) => {
  const { className, accept, files, setFiles, error, setError } = props;
  const [isDragging, setIsDragging] = useState(false);
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      const file = droppedFiles[0];
      const maxSizeInMB = 20;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        showNotification({
          message: `The file is too large. Please upload a file smaller than ${maxSizeInMB}MB.`,
          type: 'error',
        });
      } else {
        const modifiedFiles = droppedFiles.map((_file) => ({
          file: _file,
          id: generateId(),
        }));
        setFiles(modifiedFiles);
        setError(null);
      }
    }
  };

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length) {
      const file = selectedFiles[0];
      const maxSizeInMB = 20;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        showNotification({
          message: `The file is too large. Please upload a file smaller than ${maxSizeInMB}MB.`,
          type: 'error',
        });
      } else {
        const modifiedFiles = selectedFiles.map((_file) => ({
          file: _file,
          id: generateId(),
        }));
        setFiles(modifiedFiles);
        setError(null);
      }
    }
  };

  const handleOpenFileDialog: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onDeleteClick = (id: string) => {
    const filteredFiles = files.filter((item) => item.id !== id);
    setFiles(filteredFiles);
  };

  const handlePreviewClick = (index: number) => {
    setPreviewIndex(index);
  };

  const handleClosePreview = () => {
    setPreviewIndex(null);
  };

  const handleNext = () => {
    if (previewIndex !== null && previewIndex < files.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const handlePrev = () => {
    if (previewIndex !== null && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  return (
    <FlexBox
      flexDirection="column"
      height="calc(100% - 160px)"
      gap={'5px'}
      className={className}
    >
      <FlexBox
        gap={'20px'}
        padding="20px"
        height="95%"
        style={{ background: '#f1f1f1', borderRadius: '8px' }}
      >
        <FileUploadDNDContainer
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          alignItems="center"
          justifyContent="center"
          width="60%"
          height="100%"
          flexDirection="column"
          gap={'8px'}
          $isDragging={isDragging}
        >
          <UploadFileIcon
            sx={{ width: '120px', height: '120px', marginBottom: '20px' }}
          />
          <Typography variant="h6">
            {isDragging ? t('release_to_drop') : t('drag_and_drop')}
          </Typography>
          <Typography variant="body2">{t('or')}</Typography>
          <input
            type="file"
            multiple
            accept={accept}
            ref={fileInputRef}
            onChange={handleFileSelection}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <Button variant="contained" onClick={handleOpenFileDialog}>
            <Trans i18nKey="browse" />
          </Button>
        </FileUploadDNDContainer>
        {files.length ? (
          <UploadedFiles
            files={files}
            onDeleteClick={onDeleteClick}
            onPreviewClick={handlePreviewClick}
          />
        ) : null}
      </FlexBox>
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}

      {/* Preview Dialog */}
      <FilePreview
        files={files}
        handleClosePreview={handleClosePreview}
        handleNext={handleNext}
        handlePrev={handlePrev}
        previewIndex={previewIndex}
      />
    </FlexBox>
  );
};
