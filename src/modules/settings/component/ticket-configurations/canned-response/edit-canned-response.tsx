import { Edit } from '@mui/icons-material';
import { t } from 'i18next';
import { CustomIconButton, DrawerExtended } from 'lib/ui-ux';
import { CannedResponse } from 'modules/settings/apis/canned-response';
import { EditCannedResponseContainer } from 'modules/settings/containers/canned-response';
import { useState, useCallback } from 'react';

export const EditCannedResponse = (props: {
  currentData: CannedResponse;
  allData: CannedResponse[];
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = useCallback(() => {
    setShowDrawer((preValue) => !preValue);
  }, []);
  return (
    <>
      <CustomIconButton
        iconComponent={<Edit />}
        tooltipProps={{ title: t('edit_canned_response'), arrow: true }}
        onClick={toggleDrawer}
      />
      <DrawerExtended
        open={showDrawer}
        anchor="right"
        width="500px"
        header="View or Edit Canned Response"
        onRenderContent={() => (
          <EditCannedResponseContainer
            onSelectRowMetaData={props.currentData}
            toggleDrawer={toggleDrawer}
            statusData={props.allData}
          />
        )}
        onClose={toggleDrawer}
      />
    </>
  );
};
