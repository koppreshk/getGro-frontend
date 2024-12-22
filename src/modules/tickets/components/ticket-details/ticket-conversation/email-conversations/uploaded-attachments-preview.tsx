import { DeleteOutline } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import { IFileInfo, IChangeArgs, FlexBox } from 'lib/ui-ux';
import { styled } from 'styled-components';

interface IUploadedAttachmentsPreviewProps {
  item: IFileInfo;
  attachmets: IChangeArgs;
}

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

export const UploadedAttachmentsPreview = (
  props: IUploadedAttachmentsPreviewProps
) => {
  const { item, attachmets } = props;

  return (
    <AttachmentPreviewContainer key={item.id} gap="8px" alignItems="center">
      <FileType alignItems="center" justifyContent="center">
        <Typography variant="caption" sx={{ color: 'inherit' }}>
          {item.name.split('.').pop()?.toUpperCase()}
        </Typography>
      </FileType>
      <Typography
        variant="body3"
        title={item.name}
        sx={{
          maxWidth: '120px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {item.name}
      </Typography>
      <IconButton onClick={() => attachmets.remove(item.id)}>
        <DeleteOutline />
      </IconButton>
    </AttachmentPreviewContainer>
  );
};
