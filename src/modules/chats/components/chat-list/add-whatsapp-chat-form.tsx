import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import {
  AutoCompleteFieldWithLabel,
  SelectFieldWithLabel,
  TagInputField,
} from 'lib/form-fields';
import { DrawerExtended, FlexBox } from 'lib/ui-ux';
import { PhoneChannelList, useFetchTemplates } from 'modules/chats/apis';
import { WhatsappChatTemplateContainer } from 'modules/chats/containers';
import { FormProvider, useForm } from 'react-hook-form';
import styledComponents from 'styled-components';

interface IAddWhatsappChatFormProps {
  openAddWhatsappChatFormDrawer: boolean;
  toggleAddWhatsappChatFormDrawer: () => void;
}

interface WhatsappTemplateFormFields {
  waba_no: string;
  templates: string;
  add_phone_no: string;
}

const StyledTagInputField = styledComponents(TagInputField)`
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

export const WhatsappTemplateForm = (
  props: Pick<IAddWhatsappChatFormProps, 'toggleAddWhatsappChatFormDrawer'> & {
    data: PhoneChannelList;
  }
) => {
  const { toggleAddWhatsappChatFormDrawer, data } = props;
  const form = useForm<WhatsappTemplateFormFields>();
  const { data: templates, isLoading } = useFetchTemplates(
    form.watch('waba_no')
  );
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
            menuOptions={data.map((item) => ({
              key: item.channel,
              label: item.number,
              value: item.number,
            }))}
            name="waba_no"
            label="WABA Number"
            rules={{ required: 'WABA Number is required' }}
          />
          <AutoCompleteFieldWithLabel
            options={(templates?.templates || []).map((item) => ({
              key: item,
              label: item,
              value: item,
            }))}
            name="templates"
            label="Templates"
            multiple={false}
            placeholder={''}
            isLoading={isLoading}
            // rules={{ required: 'Please choose a template' }}
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
      header={t('Whatsapp Template Form')}
      width="600px"
      open={openAddWhatsappChatFormDrawer}
      onRenderContent={() => (
        <WhatsappChatTemplateContainer
          toggleAddWhatsappChatFormDrawer={toggleAddWhatsappChatFormDrawer}
        />
      )}
      onClose={toggleAddWhatsappChatFormDrawer}
    />
  );
};
