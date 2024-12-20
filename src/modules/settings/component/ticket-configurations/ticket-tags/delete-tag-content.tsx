import { FlexBox, MoreInformation } from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';

export const DeleteTagContent = () => {
  const { t } = useTranslation();
  return (
    <FlexBox flexDirection="column" gap={'10px'}>
      <MoreInformation information={t('tags_delete_content')} type="error" />
      <ul>
        <li>{t('tags_delete_li1')}</li>
      </ul>
    </FlexBox>
  );
};
