import { Send, Upload } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import {
  AutoCompleteFieldWithLabel,
  FileUploadField,
  SelectFieldWithLabel,
} from 'lib/form-fields';
import { DrawerExtended, FlexBox, IChangeArgs } from 'lib/ui-ux';
import { PhoneChannelList, useFetchTemplates } from 'modules/chats/apis';
import { WhatsappChatTemplateContainer } from 'modules/chats/containers';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ImageGallery } from './image-gallery';
import { UploadedFiles } from './uploaded-files';

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
  phoneNumbers: IChangeArgs;
}

export const WhatsappTemplateForm = (
  props: Pick<IAddWhatsappChatFormProps, 'toggleAddWhatsappChatFormDrawer'> & {
    data: PhoneChannelList;
    onSend: (args: WhatsappTemplateFormFields & { imageURL: string }) => void;
  }
) => {
  const { toggleAddWhatsappChatFormDrawer, data, onSend } = props;
  const form = useForm<WhatsappTemplateFormFields>();
  const { data: templates, isLoading } = useFetchTemplates(
    form.watch('waba_no')
  );
  const [selected, setSelected] = useState<string | null>(null);

  const validate = (value: IChangeArgs): boolean | string => {
    if (value && value.selectedFiles[0].size > 5 * 1024 * 1024) {
      return 'File size exceeds 5MB';
    }
    return true;
  };

  const onSendTemplate = (formData: WhatsappTemplateFormFields) => {
    onSend({ ...formData, imageURL: selected || '' });
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
              key: item.template_id,
              label: item.name,
              value: item.name,
            }))}
            name="templateName"
            label="Templates"
            multiple={false}
            placeholder={'Please choose a template'}
            isLoading={isLoading}
          />
          <ImageGallery
            urls={templates?.templates.image_urls || []}
            selected={selected}
            onChange={setSelected}
          />
          <FlexBox flexDirection="column" gap={'8px'}>
            <Typography variant="h6">Upload Phone Numbers</Typography>
            <FileUploadField
              name="phoneNumbers"
              accept="text/csv"
              readMode="readAsDataURL"
              rules={{ validate: validate }}
              onRenderButton={(args) => (
                <Button
                  {...args}
                  size="medium"
                  style={{ width: '100%' }}
                  startIcon={<Upload />}
                  variant="contained"
                >
                  Upload Phone Numbers
                </Button>
              )}
            />
            {form.watch('phoneNumbers')?.selectedFiles.length ? (
              <UploadedFiles
                files={form.watch('phoneNumbers').selectedFiles.map((item) => ({
                  name: item.name,
                  id: item.id,
                }))}
                onDeleteClick={(id: string) => {
                  const currentFiles =
                    form.getValues('phoneNumbers').selectedFiles;
                  const updatedFiles = currentFiles.filter(
                    (file) => file.id !== id
                  );
                  form.setValue('phoneNumbers', {
                    ...form.getValues('phoneNumbers'),
                    selectedFiles: updatedFiles,
                  });
                }}
              />
            ) : null}
          </FlexBox>
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
            onClick={form.handleSubmit(onSendTemplate)}
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
