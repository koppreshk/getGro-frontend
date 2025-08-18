import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { FlexBox } from 'lib/ui-ux';
import { useFetchTemplateById } from 'modules/chats/apis';
import React from 'react';

const PlaceholderIllustration = React.lazy(
  () => import('../../../../../assets/svg/landscape-placeholder.svg?react')
);

const formatWhatsappText = (text: string) => {
  return text
    .replace(/\*(.*?)\*/g, '<b>$1</b>') // *bold*
    .replace(/_(.*?)_/g, '<i>$1</i>') // _italic_
    .replace(/~(.*?)~/g, '<s>$1</s>') // ~strikethrough~
    .replace(/```(.*?)```/g, '<code>$1</code>') // ```code```
    .replace(/`(.*?)`/g, '<code>$1</code>') // `inline code`
    .replace(/\n/g, '<br/>'); // line breaks
};

const WhatsAppMessageContainer = styled(Box)(() => ({
  backgroundColor: '#e6ffda', // WhatsApp-style light green
  borderRadius: '12px',
  padding: '10px',
  maxWidth: '80%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
}));

const WhatsAppImage = styled('img')({
  width: '100%',
  borderRadius: '8px',
  marginBottom: '8px',
  objectFit: 'cover',
});

export const TemplatePreview = (props: {
  templateId: string;
  channel: string;
  selectedImage: string | null;
}) => {
  const { selectedImage } = props;
  const { data } = useFetchTemplateById(props.templateId, props.channel);

  return (
    <FlexBox flexDirection="column" height="100%" width="50%" overflowY="auto">
      <Typography variant="h6">Preview</Typography>
      <FlexBox flexDirection="column">
        {selectedImage ? (
          <WhatsAppMessageContainer>
            <WhatsAppImage src={selectedImage} alt="alternate" />
            <Typography
              variant="body2"
              component="div"
              sx={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{
                __html: formatWhatsappText(data?.body || ''),
              }}
            />
          </WhatsAppMessageContainer>
        ) : (
          <PlaceholderIllustration width="100%" height={'400px'} />
        )}
      </FlexBox>
    </FlexBox>
  );
};
