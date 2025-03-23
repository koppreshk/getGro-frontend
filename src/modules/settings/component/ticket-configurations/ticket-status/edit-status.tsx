import { Edit } from '@mui/icons-material';
import { CustomIconButton, DrawerExtended } from 'lib/ui-ux';
import { IFetchAllStatuses } from 'modules/settings/apis/ticket-status';
import { EditTicketStatusContainer } from 'modules/settings/containers/ticket-status';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface EditStatusProps {
  statusData: IFetchAllStatuses[];
  selectedData: IFetchAllStatuses;
}

export const EditStatus = (props: EditStatusProps) => {
  const { statusData, selectedData } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const toggleDrawer = useCallback(() => {
    setShowDrawer((preValue) => !preValue);
  }, []);

  return (
    <>
      <CustomIconButton
        iconComponent={<Edit />}
        tooltipProps={{ title: 'Edit Status', arrow: true }}
        onClick={toggleDrawer}
      />
      <DrawerExtended
        open={showDrawer}
        anchor="right"
        width="500px"
        header={t('edit_ticket_label')}
        onRenderContent={() => (
          <EditTicketStatusContainer
            onSelectRowMetaData={selectedData}
            toggleDrawer={toggleDrawer}
            statusData={statusData}
          />
        )}
        onClose={toggleDrawer}
      />
    </>
  );
};
