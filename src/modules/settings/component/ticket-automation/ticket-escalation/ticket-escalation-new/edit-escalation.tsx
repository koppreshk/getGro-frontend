import { Edit } from '@mui/icons-material';
import { CustomIconButton } from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const EditEscalation = (props: { id: number }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onEditClick = () => {
    navigate(`edit-escalation?id=${props.id}`);
  };

  return (
    <CustomIconButton
      iconComponent={<Edit />}
      tooltipProps={{ title: t('edit_escalation'), arrow: true }}
      onClick={onEditClick}
    />
  );
};
