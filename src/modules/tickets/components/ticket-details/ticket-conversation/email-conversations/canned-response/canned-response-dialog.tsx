import { Close, PostAddOutlined, Search } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { CancelButton, FlexBox } from 'lib/ui-ux';
import {
  CannedResponse,
  useFetchAllCannedResponses,
} from 'modules/settings/apis/canned-response';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const StyledItemsContent = styled(FlexBox)`
  height: 400px;
  overflow-y: scroll;
  border-radius: 5px;
  background: #f9f7f7;
  padding: 5px;
`;

const StyledItem = styled(FlexBox)<{ isSelected: boolean }>`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? '#e5e4fc' : 'transparent'};
  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledCannedResponseContent = styled(FlexBox)`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ theme }) => theme.semantics.standardBorder};
  flex: 3;
`;

interface IInsertCannedResponseProps {
  editorType: string;
  openPopup: boolean;
  togglePopup: () => void;
}

export const InsertCannedResponseDialog = (
  props: IInsertCannedResponseProps
) => {
  const { openPopup, togglePopup } = props;
  const { data, isLoading } = useFetchAllCannedResponses();
  const [cannedResponse, setCannedResponse] = useState<CannedResponse[]>([]);
  const [selectedCannedResponse, setSelectedCannedResponse] =
    useState<CannedResponse | null>(null);

  const { setValue } = useFormContext();

  const { t } = useTranslation();

  const ticketMetadata = useAppSelector((state) => state.tickets.ticketDetails);
  const agentData = useAppSelector((state) => state.core.config);

  const resultObject = useMemo(() => {
    return {
      ticketId: ticketMetadata?.ticketId.toString() ?? '',
      name: ticketMetadata?.customerName ?? '',
      agentName: agentData?.user_details.display_name ?? '',
    };
  }, [
    agentData?.user_details.display_name,
    ticketMetadata?.customerName,
    ticketMetadata?.ticketId,
  ]);

  const handleClose = useCallback(() => {
    togglePopup();
    setSelectedCannedResponse(null);
  }, [togglePopup]);

  const setEditorValue = useCallback(() => {
    if (selectedCannedResponse) {
      const currentValue = selectedCannedResponse.body;
      const parsedContent = currentValue.replace(
        /{{(.*?)}}/g,
        (_, key: string) => resultObject[key as keyof typeof resultObject] || ''
      );

      setValue(`${props.editorType}.editor`, parsedContent);
      handleClose();
    }
  }, [
    handleClose,
    props.editorType,
    resultObject,
    selectedCannedResponse,
    setValue,
  ]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.value.length) {
      const filteredTemplates = data?.filter((item) =>
        item.body.toLowerCase().includes(ev.target.value.toLowerCase())
      );
      setCannedResponse(filteredTemplates || []);
    } else {
      setCannedResponse(data || []);
    }
  };

  useEffect(() => {
    if (data) {
      setCannedResponse(data);
    }
  }, [data]);

  return (
    <Dialog open={openPopup} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ fontSize: '16px' }}>
        {t('canned_response')}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <FlexBox flexDirection="row" gap="20px">
          <FlexBox flexDirection="column" style={{ flex: 1 }}>
            <TextField
              name="search"
              size="small"
              onChange={onChange}
              placeholder="Search canned response"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: '10px' }}
            />
            <StyledItemsContent flexDirection="column" gap="5px">
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                cannedResponse.map((item) => (
                  <StyledItem
                    key={item.id}
                    onClick={() => setSelectedCannedResponse(item)}
                    title={item.name}
                    isSelected={selectedCannedResponse?.id === item.id}
                  >
                    <span title={item.name}>{item.name}</span>
                  </StyledItem>
                ))
              )}
            </StyledItemsContent>
          </FlexBox>
          <StyledCannedResponseContent flexDirection="column" gap="20px">
            {!selectedCannedResponse ? (
              <Typography variant="h5" style={{ margin: 'auto' }}>
                {t('no_canned_response_selected')}
              </Typography>
            ) : (
              <>
                <Typography variant="h5">
                  {selectedCannedResponse?.name}
                </Typography>
                <Typography variant="caption">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedCannedResponse?.body ?? '',
                    }}
                  />
                </Typography>
              </>
            )}
          </StyledCannedResponseContent>
        </FlexBox>

        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: 'flex-end', padding: '0 24px 16px' }}
      >
        <CancelButton onClick={handleClose} />
        <Button
          variant="contained"
          endIcon={<PostAddOutlined />}
          onClick={setEditorValue}
          disabled={!selectedCannedResponse}
        >
          {t('insert_canned_response')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
