import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useFetchTemplateById } from 'modules/chats/apis';
import React from 'react';

const PlaceholderIllustration = React.lazy(
  () => import('../../../../../assets/svg/landscape-placeholder.svg?react')
);

export const TemplatePreview = (props: { templateId: string }) => {
  const { data } = useFetchTemplateById(props.templateId);
  console.log(data, props);
  return (
    <>
      <FlexBox
        flexDirection="column"
        height="100%"
        width="50%"
        overflowY="auto"
      >
        <Typography variant="h6">Preview</Typography>
        <FlexBox flexDirection="column" alignItems="center">
          <FlexBox flexDirection="column" width="60%">
            <PlaceholderIllustration width="90%" height="50%" />
            <Typography variant="body2" sx={{ marginTop: '16px' }}>
              This is a preview of the WhatsApp template. You can customize it
              further before sending.
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};
