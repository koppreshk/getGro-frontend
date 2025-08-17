import { Send, Upload } from '@mui/icons-material';
import CollectionsIcon from '@mui/icons-material/Collections';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import {
  AutoCompleteFieldWithLabel,
  FileUploadField,
  SelectFieldWithLabel,
} from 'lib/form-fields';
import { FlexBox, IChangeArgs, OrDivider } from 'lib/ui-ux';
import { PhoneChannelList, useFetchTemplates } from 'modules/chats/apis';
import { WhatsappChatTemplateContainer } from 'modules/chats/containers';
import { StyledTagInputField } from 'modules/tickets/components/ticket-details/ticket-list-view/add-ticket/add-ticket-form';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { ImageGallery } from '../image-gallery';
import { UploadedFiles } from '../uploaded-files';
import { TemplatePreview } from './template-preview';

const StyledAutoCompleteField = styled(AutoCompleteFieldWithLabel)`
  width: 90%;
`;

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
  addPhoneNo: { name: string; id: string }[];
  phoneNumbers: IChangeArgs;
}

export const WhatsappTemplateForm = (
  props: Pick<IAddWhatsappChatFormProps, 'toggleAddWhatsappChatFormDrawer'> & {
    data: PhoneChannelList;
    onSend: (args: WhatsappTemplateFormFields & { imageURL: string }) => void;
  }
) => {
  const { toggleAddWhatsappChatFormDrawer, data, onSend } = props;
  const form = useForm<WhatsappTemplateFormFields>({
    defaultValues: {
      waba_no: '',
      templateName: { key: '', label: '', value: '' },
      phoneNumbers: { selectedFiles: [] },
      addPhoneNo: [],
    },
    mode: 'onChange',
  });
  const { data: templates, isLoading } = useFetchTemplates(
    form.watch('waba_no')
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [isImageDialogOpen, setImageDialogOpen] = useState<boolean>(false);

  const validate = (value: IChangeArgs): boolean | string => {
    if (value && value.selectedFiles[0]?.size > 5 * 1024 * 1024) {
      return 'File size exceeds 5MB';
    }
    return true;
  };

  const onSendTemplate = (formData: WhatsappTemplateFormFields) => {
    onSend({ ...formData, imageURL: selected || '' });
  };

  const onIconClick = () => {
    setImageDialogOpen((prev) => !prev);
  };

  return (
    <FormProvider {...form}>
      <FlexBox padding="16px" gap={'20px'} flexDirection="column">
        <FlexBox gap={'20px'}>
          <FlexBox
            flexDirection="column"
            gap={'20px'}
            height="calc(100% - 77px)"
            width="50%"
            justifyContent="space-between"
          >
            <FlexBox
              gap={'16px'}
              flexDirection="column"
              height="calc(100% - 62px)"
              width="100%"
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
              <FlexBox
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <StyledAutoCompleteField
                  options={(templates?.templates.templates || []).map(
                    (item) => ({
                      key: item.template_id,
                      label: item.name,
                      value: item.name,
                    })
                  )}
                  name="templateName"
                  label="Templates"
                  multiple={false}
                  placeholder={'Please choose a template'}
                  isLoading={isLoading}
                />
                <IconButton
                  title={selected ? 'Image Selected' : 'Please Select image'}
                  onClick={onIconClick}
                >
                  {selected ? (
                    <CollectionsIcon color="primary" />
                  ) : (
                    <CollectionsBookmarkOutlinedIcon />
                  )}
                </IconButton>
                <Dialog open={isImageDialogOpen}>
                  <DialogTitle>Select Image</DialogTitle>
                  <DialogContent>
                    <ImageGallery
                      urls={templates?.templates.image_urls || []}
                      selected={selected}
                      onChange={setSelected}
                    />
                  </DialogContent>
                  <Button
                    variant="outlined"
                    sx={{
                      margin: '16px',
                      width: '100px',
                      alignSelf: 'flex-end',
                    }}
                    onClick={() => setImageDialogOpen(false)}
                  >
                    Close
                  </Button>
                </Dialog>
              </FlexBox>
              <Typography variant="h6" className="select-field-header-label">
                Add Phone Number
              </Typography>
              <StyledTagInputField name="addPhoneNo" dontShowDashes />
              <Typography variant="body3">
                <b>Note:</b> You can add multiple phone numbers by pressing
                enter/return key
              </Typography>
              <OrDivider />
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
                    files={form
                      .watch('phoneNumbers')
                      .selectedFiles.map((item) => ({
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
          </FlexBox>
          <TemplatePreview templateId={form.watch('templateName').key} />
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
    <Dialog
      open={openAddWhatsappChatFormDrawer}
      onClose={toggleAddWhatsappChatFormDrawer}
      PaperProps={{
        sx: { maxWidth: '90%', width: '100%' },
      }}
    >
      <DialogTitle>{t('Whatsapp Template Form')}</DialogTitle>
      <DialogContent>
        <WhatsappChatTemplateContainer
          toggleAddWhatsappChatFormDrawer={toggleAddWhatsappChatFormDrawer}
        />
      </DialogContent>
    </Dialog>
  );
};
