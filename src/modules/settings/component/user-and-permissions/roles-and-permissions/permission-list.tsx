import { Typography } from '@mui/material';
import { AllPermissionKeys } from 'lib/enums';
import { CheckboxField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';

export const PermissionList = (props: {
  name: string;
  permissionKey: AllPermissionKeys;
  disabled?: boolean;
}) => {
  const { name, permissionKey, disabled } = props;
  const { t } = useTranslation();
  return (
    <FlexBox gap={'10px'} alignItems="center">
      <CheckboxField
        name={`permissions.${permissionKey as string}`}
        disabled={disabled}
      />
      <Typography
        variant="body2"
        sx={{ color: disabled ? '#3b445580' : '#3b4455' }}
      >
        {t(name.toLocaleLowerCase().split(' ').join('_'))}
      </Typography>
    </FlexBox>
  );
};
