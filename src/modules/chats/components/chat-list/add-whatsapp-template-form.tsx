import { Send, Upload } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import {
  AutocompleteField,
  AutoCompleteFieldWithLabel,
  FileUploadField,
  SelectFieldWithLabel,
  TagInputField,
} from 'lib/form-fields';
import { DrawerExtended, FlexBox, IChangeArgs } from 'lib/ui-ux';
import { PhoneChannelList, useFetchTemplates } from 'modules/chats/apis';
import { WhatsappChatTemplateContainer } from 'modules/chats/containers';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IAddWhatsappChatFormProps {
  openAddWhatsappChatFormDrawer: boolean;
  toggleAddWhatsappChatFormDrawer: () => void;
}

export interface WhatsappTemplateFormFields {
  waba_no: string;
  templateName: {
    key: string;
    label: string;
    value: string;
  };
  add_phone_no: {
    id: string;
    name: string;
  }[];
  existingImages?: {
    key: string;
    label: string;
    value: string;
  };
  templateImage: IChangeArgs;
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

const ImagePreviewCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafbfc; /* softer than pure white but lighter than gray */
  border-radius: 10px;
  border: 1px solid #e3e6eb;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    border-color: #ccd5e0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  }
`;

const PreviewImg = styled.img`
  max-height: 260px;
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid #e0e6f0;
  object-fit: contain;
  background: #fff;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.015);
  }
`;

export const WhatsappTemplateForm = (
  props: Pick<IAddWhatsappChatFormProps, 'toggleAddWhatsappChatFormDrawer'> & {
    data: PhoneChannelList;
    onSend: (args: WhatsappTemplateFormFields) => void;
  }
) => {
  const { toggleAddWhatsappChatFormDrawer, data, onSend } = props;
  const form = useForm<WhatsappTemplateFormFields>();
  const { data: templates, isLoading } = useFetchTemplates(
    form.watch('waba_no')
  );

  const validate = (value: IChangeArgs): boolean | string => {
    if (value && value.selectedFiles[0].size > 5 * 1024 * 1024) {
      return 'File size exceeds 5MB';
    }
    return true;
  };

  return (
    <FormProvider {...form}>
      <FlexBox
        flexDirection="column"
        padding="16px"
        gap={'20px'}
        height="calc(100% -   77px)"
        justifyContent="space-between"
      >
        <FlexBox
          gap={'16px'}
          flexDirection="column"
          height="calc(100% - 62px)"
          overflowY="auto"
        >
          <SelectFieldWithLabel
            menuOptions={data.map((item) => ({
              key: item.channel,
              label: item.number,
              value: item.number,
            }))}
            name="waba_no"
            label="WABA Number"
            placeholder="Please choose a WABA Number"
            rules={{ required: 'WABA Number is required' }}
          />
          <AutoCompleteFieldWithLabel
            options={(templates?.templates.templates || []).map((item) => ({
              key: item,
              label: item,
              value: item,
            }))}
            name="templateName"
            label="Templates"
            multiple={false}
            placeholder={'Please choose a template'}
            isLoading={isLoading}
          />
          <FlexBox flexDirection="column" gap={'8px'}>
            <Typography variant="h6" className="select-field-header-label">
              Add Phone Number
            </Typography>
            <StyledTagInputField name="add_phone_no" dontShowDashes />
            <Typography variant="body3">
              <b>Note:</b> You can add multiple phone numbers by pressing
              enter/return key
            </Typography>
          </FlexBox>
          <FlexBox gap={'8px'} flexDirection="column">
            <Typography
              variant="h6"
              className="select-field-header-label"
              sx={{ mt: '8px' }}
            >
              Upload an image or choose from the list
            </Typography>
            <FlexBox gap={'30px'} alignItems="center">
              <FileUploadField
                name="templateImage"
                accept="image/*"
                readMode="readAsDataURL"
                rules={{ validate: validate }}
                onRenderButton={(args) => (
                  <Button
                    {...args}
                    size="medium"
                    style={{ width: '50%' }}
                    startIcon={<Upload />}
                    variant="contained"
                  >
                    Upload Image
                  </Button>
                )}
              />
              <AutocompleteField
                options={(templates?.templates.image_urls || []).map(
                  (item) => ({
                    key: item,
                    label: item,
                    value: item,
                  })
                )}
                size="small"
                name="existingImages"
                multiple={false}
                placeholder={'Select existing image'}
                sx={{ width: '50%' }}
              />
            </FlexBox>
          </FlexBox>
          {form.watch('templateImage')?.selectedFiles[0]?.content && (
            <ImagePreviewCard>
              <PreviewImg
                src={
                  form.watch('templateImage')?.selectedFiles[0]
                    .content as string
                }
                alt="Template Image"
              />
            </ImagePreviewCard>
          )}
        </FlexBox>
        <FlexBox gap={'16px'} justifyContent="flex-end">
          <Button
            variant="outlined"
            size="large"
            onClick={toggleAddWhatsappChatFormDrawer}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            size="large"
            endIcon={<Send />}
            onClick={form.handleSubmit(onSend)}
          >
            {t('send')}
          </Button>
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};

export const AddWhatsappTemplateForm = (props: IAddWhatsappChatFormProps) => {
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
