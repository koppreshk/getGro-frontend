import { Button, Paper, Typography } from '@mui/material';
import { TextboxFieldWithLabel } from 'lib/form-fields';
import { FlexBox, MoreInformation } from 'lib/ui-ux';
import { useFormContext } from 'react-hook-form';

interface PreviewFormProps {
  formTitle: string;
  formDescription?: string;
  btnBgColor?: string;
  btnTextColor?: string;
  footerMessage?: string;
  submitBtnName?: string;
  confirmationMessage?: string;
  isSuccess?: boolean;
  onSubmit?: (formdata: IPreviewFormFields) => Promise<any>;
}

export interface IPreviewFormFields {
  Name: string;
  Email: string;
  Subject: string;
  PhoneNumber: string;
  Help: string;
}

export const PreviewForm = (props: PreviewFormProps) => {
  const {
    formTitle,
    formDescription,
    btnBgColor,
    btnTextColor,
    footerMessage,
    submitBtnName,
    isSuccess,
    confirmationMessage,
    onSubmit,
  } = props;

  const form = useFormContext<IPreviewFormFields>();

  return (
    <FlexBox width="100%" height="100%">
      {isSuccess ? (
        <MoreInformation
          information={confirmationMessage ?? 'Form Submitted Successfully'}
          type="primary"
        />
      ) : (
        <Paper
          className="preview-form-container"
          sx={{ minWidth: '300px', width: '100%', height: 'min-content' }}
        >
          <FlexBox padding="20px" width="100%" flexDirection="column">
            <FlexBox
              alignItems="center"
              gap={'10px'}
              width="100%"
              flexDirection="column"
            >
              <Typography variant="h4">{formTitle}</Typography>
              <Typography variant="body3">{formDescription}</Typography>
            </FlexBox>
            <FlexBox flexDirection="column" gap={'10px'}>
              <TextboxFieldWithLabel
                name="Name"
                label={'Name'}
                rules={{ required: 'Name is required' }}
              />
              <TextboxFieldWithLabel
                name="Email"
                label={'Email'}
                rules={{ required: 'Email is required' }}
              />
              <TextboxFieldWithLabel
                name="PhoneNumber"
                label={'Phone Number'}
              />
              <TextboxFieldWithLabel
                name="Subject"
                label={'Subject'}
                rules={{ required: 'Subject is required' }}
              />
              <TextboxFieldWithLabel name="Help" label={'How can we help?'} />
              <Typography variant="body3">{footerMessage}</Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: btnBgColor, color: btnTextColor }}
                onClick={onSubmit && form.handleSubmit(onSubmit)}
              >
                {submitBtnName}
              </Button>
            </FlexBox>
          </FlexBox>
        </Paper>
      )}
    </FlexBox>
  );
};
