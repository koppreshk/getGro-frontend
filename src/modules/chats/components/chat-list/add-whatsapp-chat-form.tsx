import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import { SelectFieldWithLabel, TagInputField } from 'lib/form-fields';
import { DrawerExtended, FlexBox } from 'lib/ui-ux';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IAddWhatsappChatFormProps {
  openAddWhatsappChatFormDrawer: boolean;
  toggleAddWhatsappChatFormDrawer: () => void;
}

const StyledTagInputField = styled(TagInputField)`
  padding: 16.5px 14px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
  width: 100%;
  &:hover {
    border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
  }
  input {
    min-width: 155px;
  }
`;

const WhatsappTemplateForm = (
  props: Pick<IAddWhatsappChatFormProps, 'toggleAddWhatsappChatFormDrawer'>
) => {
  const { toggleAddWhatsappChatFormDrawer } = props;
  const form = useForm();
  return (
    <FormProvider {...form}>
      <FlexBox
        flexDirection="column"
        padding="16px"
        height="calc(100% - 85px)"
        justifyContent="space-between"
      >
        <FlexBox gap={'16px'} flexDirection="column">
          <SelectFieldWithLabel
            menuOptions={[]}
            name="select_phone_no"
            label="Select Phone Number"
          />
          <SelectFieldWithLabel
            menuOptions={[]}
            name="templates"
            label="Templates"
          />
          <FlexBox flexDirection="column" gap={'8px'}>
            <Typography
              variant="h6"
              className="select-field-header-label"
              sx={{ color: '#3b4455' }}
            >
              Add Phone Number
            </Typography>
            <StyledTagInputField name="add_phone_no" dontShowDashes />
          </FlexBox>
        </FlexBox>
        <FlexBox gap={'16px'} justifyContent="flex-end">
          <Button variant="outlined" onClick={toggleAddWhatsappChatFormDrawer}>
            {t('cancel')}
          </Button>
          <Button variant="contained">{t('submit')}</Button>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

export const AddWhatsappChatForm = (props: IAddWhatsappChatFormProps) => {
  const { openAddWhatsappChatFormDrawer, toggleAddWhatsappChatFormDrawer } =
    props;
  return (
    <DrawerExtended
      anchor="right"
      header={t('add_whatsapp_chat')}
      width="600px"
      open={openAddWhatsappChatFormDrawer}
      onRenderContent={() => (
        <WhatsappTemplateForm
          toggleAddWhatsappChatFormDrawer={toggleAddWhatsappChatFormDrawer}
        />
      )}
      onClose={toggleAddWhatsappChatFormDrawer}
    />
  );
};
