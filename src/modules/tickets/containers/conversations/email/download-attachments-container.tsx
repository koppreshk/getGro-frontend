import { FileDownloadOutlined } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton } from 'lib/ui-ux';

import { Conversations, IAttachments } from '../../../apis';

export const DownloadAttachmentsContainer = (
  props: Pick<IAttachments, 'attachmentId' | 'fileUrl' | 'fileName'> &
    Pick<Conversations, 'messageId'>
) => {
  const { fileUrl, fileName } = props;
  const { showNotification } = useNotifications();

  const downloadFile = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error('Download failed', error);
      showNotification({ message: (error as Error).message, type: 'error' });
    }
  };

  const onDownloadClick = () => {
    downloadFile();
  };

  return (
    <CustomIconButton
      onClick={onDownloadClick}
      tooltipProps={{ title: 'Download File' }}
      iconComponent={<FileDownloadOutlined />}
    />
  );
};
