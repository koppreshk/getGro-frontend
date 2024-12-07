import { FormProvider, useForm } from 'react-hook-form';

import { PreviewForm } from './preview-form';

export const ExternalPreviewForm = () => {
  const form = useForm();
  const formTitle = 'Contact us'; //should come from api
  const formDescription = 'abc';

  return (
    <FormProvider {...form}>
      <PreviewForm formTitle={formTitle} formDescription={formDescription} />
    </FormProvider>
  );
};
