import { DeleteOutline } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import styled from 'styled-components';

interface UploadedFileProps {
  files: {
    name: string;
    id: string;
  }[];
  onDeleteClick: (id: string) => void;
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

export const UploadedFiles = (props: UploadedFileProps) => {
  const { files, onDeleteClick } = props;
  return (
    <FlexBox flexDirection="column" gap={'20px'}>
      {/* <Typography>
        <Trans i18nKey="uploaded_files" />
      </Typography> */}
      {files.map((item, index) => (
        <AttachmentPreviewContainer
          key={`${item.name}-${index}`}
          gap="8px"
          alignItems="center"
        >
          <FileType alignItems="center" justifyContent="center">
            <Typography variant="caption" sx={{ color: 'inherit' }}>
              {item.name.split('.').pop()?.toUpperCase()}
            </Typography>
          </FileType>
          <Typography
            variant="body3"
            title={item.name}
            sx={{
              maxWidth: '320px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {item.name}
          </Typography>
          <IconButton onClick={() => onDeleteClick(item.id)}>
            <DeleteOutline />
          </IconButton>
        </AttachmentPreviewContainer>
      ))}
    </FlexBox>
  );
};
