import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { CustomIconButton } from 'lib/ui-ux';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { InsertCannedResponseDialog } from './canned-response/canned-response-dialog';

export const InsertCannedResponse = (props: { editorType: string }) => {
  const { t } = useTranslation();
  const [openPopup, setOpenPopup] = useState(false);

  const togglePopup = useCallback(() => {
    setOpenPopup((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <CustomIconButton
        onClick={togglePopup}
        iconComponent={<InsertCommentOutlinedIcon />}
        tooltipProps={{ title: t('insert_canned_response'), arrow: true }}
      />
      <InsertCannedResponseDialog
        editorType={props.editorType}
        openPopup={openPopup}
        togglePopup={togglePopup}
      />
    </>
  );
};
