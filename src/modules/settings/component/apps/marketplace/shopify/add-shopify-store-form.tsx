import { DialogActions, Divider, Grid } from '@mui/material';
import { PasswordFieldWithLabel, TextboxFieldWithLabel } from 'lib/form-fields';
import { CancelButton, FlexBox, LoadingButton } from 'lib/ui-ux';
import { ConfigStepper } from 'modules/settings/common';
import { IShopifyFormFields } from 'modules/settings/containers/marketplace/shopify';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';

export interface IAddShopifyConfigurationFormProps {
  isMutationLoading: boolean;
  togglePopup: () => void;
  onSubmit: (formData: IShopifyFormFields) => void;
}

const steps = [
  {
    label: 'Account',
    description: `Connect shopify store with getgro`,
  },
];

const StyledTextboxField = styled(TextboxFieldWithLabel)`
  && {
    .MuiOutlinedInput-root {
      padding: 0px;
    }
  }
`;

const ShopifyDetailsForm = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <TextboxFieldWithLabel
          name="storeName"
          size="small"
          label="Store Name"
          sx={{ minWidth: '400px' }}
          rules={{ required: 'Store name required' }}
        />
      </Grid>
      <Grid item md={12}>
        <StyledTextboxField
          name="storeUrl"
          size="small"
          label="Store URL"
          autoComplete="off"
          rules={{ required: 'Store url required' }}
        />
      </Grid>
      <Grid item md={12}>
        <PasswordFieldWithLabel
          name="accessToken"
          size="small"
          type="password"
          label="Access Token"
          rules={{ required: 'Access token required' }}
        />
      </Grid>
    </Grid>
  );
};

export const ShopifyStoreConfigForm = (
  props: IAddShopifyConfigurationFormProps
) => {
  const { togglePopup, onSubmit, isMutationLoading } = props;
  const form = useFormContext<IShopifyFormFields>();
  const [activeStep] = React.useState(0);

  const onSubmitForm = React.useCallback(
    async (formField: IShopifyFormFields) => {
      onSubmit(formField);
    },
    [onSubmit]
  );

  return (
    <>
      <FlexBox gap="20px">
        <ConfigStepper activeStep={activeStep} steps={steps} />
        <Divider orientation="vertical" variant="middle" flexItem />
        {activeStep === 0 ? (
          <ShopifyDetailsForm />
        ) : (
          <span>Work in Progress..</span>
        )}
      </FlexBox>
      <DialogActions sx={{ paddingTop: '30px' }}>
        <CancelButton onClick={togglePopup} />
        <LoadingButton
          isLoading={isMutationLoading}
          variant="contained"
          autoFocus
          onClick={form.handleSubmit(onSubmitForm)}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export const AddShopifyConfigurationFormBase = (
  props: IAddShopifyConfigurationFormProps
) => {
  const form = useForm<IShopifyFormFields>({
    defaultValues: {
      storeName: '',
      storeUrl: '',
      accessToken: '',
    },
  });

  return (
    <FormProvider {...form}>
      <ShopifyStoreConfigForm {...props} />
    </FormProvider>
  );
};
