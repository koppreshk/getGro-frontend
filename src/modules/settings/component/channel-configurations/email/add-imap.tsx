import { Typography } from '@mui/material';
import { TextboxField } from 'lib/form-fields';
import {
  CancelButton,
  FlexBox,
  GridLayout,
  HorizontalSeparator,
  LoadingButton,
} from 'lib/ui-ux';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface IAddImapConfigFormFields {
  imap_username: string;
  imap_password: string;
  imap_host: string;
  imap_port: number;
  smtp_host: string;
  smtp_port: number;
}

interface IAddImapProps {
  formType?: 'ADD' | 'EDIT';
  mutationLoading: boolean;
  onSubmit: (formData: IAddImapConfigFormFields) => void;
}

export const AddImap = (props: IAddImapProps) => {
  const { formType = 'ADD', mutationLoading, onSubmit } = props;
  const { handleSubmit } = useFormContext<IAddImapConfigFormFields>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fields = [
    { name: 'imap_username' },
    { name: 'imap_password', type: 'password' },
    { name: 'imap_host' },
    { name: 'imap_port' },
    { name: 'smtp_host' },
    { name: 'smtp_port' },
  ];

  return (
    <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
      <FlexBox flexDirection="column" gap="10px">
        <Typography variant="h5">{t('imap_configuration')}</Typography>
        <HorizontalSeparator />
      </FlexBox>
      {fields.map((field) => (
        <GridLayout
          key={field.name}
          $gridGap={'50px'}
          $alignItems="center"
          $gridTemplateColumns={'125px auto'}
        >
          <Typography variant="h6">{t(field.name)}</Typography>
          <FlexBox flexDirection="column" gap={'5px'}>
            <TextboxField
              name={field.name}
              type={field.type || 'text'}
              sx={{ width: '350px' }}
              size="small"
              // rules={{ required: t('display_name_validation') }}
            />
          </FlexBox>
        </GridLayout>
      ))}

      <HorizontalSeparator />
      <FlexBox gap={'50px'}>
        <CancelButton sx={{ width: '100px' }} onClick={() => navigate(-1)} />
        <LoadingButton
          variant="contained"
          sx={{ width: '150px' }}
          onClick={handleSubmit(onSubmit)}
          isLoading={mutationLoading}
        >
          {formType === 'ADD' ? t('add') : t('edit')}
        </LoadingButton>
      </FlexBox>
    </FlexBox>
  );
};
