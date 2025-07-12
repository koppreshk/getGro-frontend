import { ConfirmationNumberOutlined, Edit } from '@mui/icons-material';
import { IconButton, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';
import styled from 'styled-components';

interface TicketsInfoTabContentProps {
  content?: string;
  label?: string;
}

const StyledContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.grayVariant5};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.sm};
  height: 48px;
  padding: 0 20px;
  align-items: center;
`;

const TicketsInfoTabContent = ({
  content,
  label,
}: TicketsInfoTabContentProps) => {
  const [isInEditMode, setIsEditMode] = React.useState(false);
  return (
    <>
      <FlexBox
        flexDirection="column"
        width="100%"
        style={{ border: '1px solid #f1f2f4', borderRadius: '6px' }}
      >
        <StyledContainer justifyContent="space-between">
          <FlexBox gap={'10px'} alignItems="center">
            <ConfirmationNumberOutlined />
            <Typography variant="h6">{label}</Typography>
          </FlexBox>
          <IconButton onClick={() => setIsEditMode(true)}>
            <Edit fontSize="small" />
          </IconButton>
        </StyledContainer>
        <FlexBox flexDirection="column">
          <FlexBox padding="20px" gap={'10px'}>
            <Typography variant="body2" sx={{ width: 'calc(100% - 90px)' }}>
              {content}
            </Typography>
            {isInEditMode && <TextField />}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export const TicketsInfoTab = () => {
  const ticketDetails = useAppSelector((state) => state.tickets.ticketDetails);

  return (
    <FlexBox flexDirection="column" gap={'8px'} width="100%">
      <TicketsInfoTabContent
        content={ticketDetails?.description}
        label={t('description')}
      />
      <TicketsInfoTabContent
        content={ticketDetails?.description}
        label={t('resolution')}
      />
    </FlexBox>
  );
};
