import {
  Edit,
  Save,
  Clear,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { IconButton, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { useUpdateTicketInfo } from 'modules/tickets/apis/update-ticket-info';
import React from 'react';
import styled from 'styled-components';

interface TicketsInfoTabContentProps {
  content?: string;
  label?: string;
  type: string;
  onSave: (args: { text: string; type: string }) => Promise<void>;
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
  type,
  onSave: onUpdateTicketInfo,
}: TicketsInfoTabContentProps) => {
  const [isInEditMode, setIsEditMode] = React.useState(false);
  const [value, setText] = React.useState(content || '');
  const onEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const onSave = () => {
    onUpdateTicketInfo({ text: value, type: type }).then(() => {
      setText('');
      setIsEditMode(false);
    });
  };
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
          {isInEditMode ? (
            <FlexBox>
              <IconButton onClick={onSave}>
                <Save fontSize="small" />
              </IconButton>
              <IconButton onClick={onEdit}>
                <Clear fontSize="small" />
              </IconButton>
            </FlexBox>
          ) : (
            <IconButton onClick={onEdit}>
              {<Edit fontSize="small" />}
            </IconButton>
          )}
        </StyledContainer>
        <FlexBox flexDirection="column">
          <FlexBox padding="20px" gap={'10px'}>
            {isInEditMode ? (
              <TextField
                fullWidth
                onChange={(ev) => setText(ev.target.value)}
              />
            ) : (
              <Typography variant="body2" sx={{ width: 'calc(100% - 90px)' }}>
                {content}
              </Typography>
            )}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export const TicketsInfoTab = () => {
  const ticketDetails = useAppSelector((state) => state.tickets.ticketDetails);
  const { mutateAsync } = useUpdateTicketInfo();

  const onSave = (args: { text: string; type: string }) => {
    return mutateAsync({
      ticket_id: ticketDetails!.ticketId,
      text: args.text,
      type: args.type,
    });
  };

  return (
    <FlexBox flexDirection="column" gap={'8px'} width="100%">
      <TicketsInfoTabContent
        content={ticketDetails?.description}
        label={t('description')}
        type="description"
        onSave={onSave}
      />
      <TicketsInfoTabContent
        content={ticketDetails?.description}
        label={t('resolution')}
        type="resolution"
        onSave={onSave}
      />
    </FlexBox>
  );
};
