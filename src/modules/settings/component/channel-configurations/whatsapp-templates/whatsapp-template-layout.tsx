import { t } from 'i18next';
import { useNotifications } from 'lib';
import {
  BreadCrumbs,
  CancelButton,
  FileUploadDND,
  FlexBox,
  IFile,
  LoadingButton,
  MoreInformation,
} from 'lib/ui-ux';
import { useUploadaTemplateImages } from 'modules/settings/apis/channel-configurations/whatsapp-templates';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatsappTemplateLayout = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<IFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isLoading } = useUploadaTemplateImages();
  const { showNotification } = useNotifications();

  const onSubmit = () => {
    if (files.length === 0) {
      setError(t('select_file_validation'));
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file.file);
    });

    mutateAsync(formData)
      .then((res) => {
        if (res.status) {
          showNotification({
            message: t('upload_template_image_success'),
            type: 'success',
          });
          navigate(-1);
          return;
        }
        showNotification({
          message: t('upload_template_image_error'),
          type: 'error',
        });
      })
      .catch(() =>
        showNotification({
          message: t('upload_template_image_error'),
          type: 'error',
        })
      );
  };
  return (
    <FlexBox
      width="100%"
      height="100%"
      flexDirection="column"
      padding="20px"
      gap={'10px'}
      overflowY="auto"
    >
      <BreadCrumbs />
      <MoreInformation information={t('whatsapp_template_more_info')} />
      <FileUploadDND
        setFiles={setFiles}
        files={files}
        error={error}
        accept="image/*"
        setError={setError}
      />
      <FlexBox gap={'20px'}>
        <CancelButton onClick={() => navigate(-1)} />
        <LoadingButton
          variant="contained"
          isLoading={isLoading}
          onClick={onSubmit}
        >
          {t('submit')}
        </LoadingButton>
      </FlexBox>
    </FlexBox>
  );
};

export default WhatsappTemplateLayout;
