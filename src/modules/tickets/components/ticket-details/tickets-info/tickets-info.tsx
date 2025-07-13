import {
  Edit,
  Save,
  Clear,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import { useNotifications } from 'lib';
import { useAppSelector } from 'lib/hooks';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { useUpdateTicketInfo } from 'modules/tickets/apis/update-ticket-info';
import React from 'react';
import ReactQuill from 'react-quill';
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

const EditorContainer = styled.div`
  width: 100%;

  .ql-container {
    height: 180px;
    max-height: 200px;
    overflow: auto;
  }
`;

const TicketsInfoTabContent = ({
  content,
  label,
  type,
  onSave: onUpdateTicketInfo,
}: TicketsInfoTabContentProps) => {
  const [isInEditMode, setIsEditMode] = React.useState(false);
  const [value, setText] = React.useState(content || '');
  const { showNotification } = useNotifications();
  const onEdit = () => {
    setIsEditMode((prev) => !prev);
    setText(content || '');
  };

  const onSave = () => {
    onUpdateTicketInfo({ text: value, type: type })
      .then(() => {
        setText('');
        setIsEditMode(false);
        showNotification({ message: 'Successfully updated!', type: 'success' });
      })
      .catch(() => {
        showNotification({ message: 'Failed to update!', type: 'error' });
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
              <CustomIconButton
                onClick={onSave}
                tooltipProps={{ title: t('save') }}
                iconComponent={<Save fontSize="small" />}
              />
              <CustomIconButton
                onClick={onEdit}
                tooltipProps={{ title: t('clear') }}
                iconComponent={<Clear fontSize="small" />}
              />
            </FlexBox>
          ) : (
            <CustomIconButton
              onClick={onEdit}
              tooltipProps={{ title: t('edit') }}
              iconComponent={<Edit fontSize="small" />}
            />
          )}
        </StyledContainer>
        <FlexBox flexDirection="column">
          <FlexBox padding="20px" gap={'10px'}>
            {isInEditMode ? (
              <EditorContainer>
                <ReactQuill
                  theme="snow"
                  value={value}
                  placeholder={t('type_in_here')}
                  preserveWhitespace
                  onChange={(text) => setText(text)}
                />
              </EditorContainer>
            ) : (
              <Typography variant="body2" sx={{ width: 'calc(100% - 90px)' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content ?? '',
                  }}
                />
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
        content={ticketDetails?.resolution}
        label={t('resolution')}
        type="resolution"
        onSave={onSave}
      />
    </FlexBox>
  );
};
