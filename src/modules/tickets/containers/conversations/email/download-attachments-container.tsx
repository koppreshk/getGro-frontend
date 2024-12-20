import { FileDownloadOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { CustomIconButton } from 'lib/ui-ux';
import { saveFile, toCamelCasedKeysFromUnderScores } from 'lib/utils';
import { useEffect } from 'react';

import {
  CasedAttachmentResposne,
  Conversations,
  IAttachments,
  useFetchAttachments,
} from '../../../apis';

export const DownloadAttachmentsContainer = (
  props: Pick<IAttachments, 'id'> & Pick<Conversations, 'messageId'>
) => {
  const { id, messageId } = props;
  const [downloadAttachments, { isLoading, data, dataUpdatedAt }] =
    useFetchAttachments(`${id}-download`);

  useEffect(() => {
    if (data) {
      const { fileContent, fileName, fileType } =
        toCamelCasedKeysFromUnderScores(data) as CasedAttachmentResposne;
      saveFile(fileContent, fileName, fileType);
    }
  }, [data, dataUpdatedAt]);

  const onDownloadClick = () => {
    downloadAttachments({ attachment_id: id, message_id: messageId });
  };

  if (isLoading) {
    return <CircularProgress size={24} />;
  }

  return (
    <CustomIconButton
      onClick={onDownloadClick}
      tooltipProps={{ title: 'Download File' }}
      iconComponent={<FileDownloadOutlined />}
    />
  );
};
