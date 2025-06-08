import { ArrowBack } from '@mui/icons-material';
import { Typography, Button } from '@mui/material';
import {
  BreadCrumbs,
  CustomIconButton,
  FlexBox,
  MoreInformation,
} from 'lib/ui-ux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CreateDepartment } from './create-department';
import { DepartmentList, IDepartmentListProps } from './department-list';

export const DepartmentLayout = (props: IDepartmentListProps) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialogBox] = useState(false);

  const toggleCreateTagDialog = () => setShowDialogBox((prev) => !prev);
  const { t } = useTranslation();

  return (
    <FlexBox
      flexDirection="column"
      gap={'20px'}
      padding="10px 20px"
      height="100%"
    >
      <BreadCrumbs />
      <MoreInformation information={t('tags_long_description')} />
      <FlexBox justifyContent="space-between" width="100%" alignItems="center">
        <FlexBox alignItems="center" gap="10px">
          <CustomIconButton
            onClick={() => navigate('/configurations')}
            iconComponent={<ArrowBack />}
            tooltipProps={{ title: t('back') }}
          />
          <Typography variant="h5">
            {/* <Trans i18nKey="tags" /> */}
            Department
          </Typography>
        </FlexBox>
        <Button variant="contained" onClick={toggleCreateTagDialog}>
          {/* <Trans i18nKey="create_tags" /> */}
          Create Department
        </Button>
      </FlexBox>
      <DepartmentList {...props} />
      <CreateDepartment
        handleClose={toggleCreateTagDialog}
        open={showDialog}
        createdTags={props.data}
      />
    </FlexBox>
  );
};
