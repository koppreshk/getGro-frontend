import { Close, PostAddOutlined, Search } from '@mui/icons-material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
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
import { CancelButton, CustomIconButton, FlexBox } from 'lib/ui-ux';
import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

interface ICannedResponse {
  header: string;
  content: string;
}

const templates: ICannedResponse[] = [
  {
    header: 'Thank You Email Template',
    content: `<div>
        <p>Hi {{name}},</p>
        <br/>
        <p>Thank you so much for referring your friend to us. I’ve enjoyed getting to know them and doing business with them. I‘m glad that you’ve stuck around with us for this long and brought your friend to share the experience with you.</p>
        <p>We‘re lucky to have you.
        <br/>
        <br/>
        Thanks again for being such a fantastic customer! As a token of our appreciation,</p>
        <br/>
        <p>Cheers,</p>
        <p>{{agentName}}</p>
        </div>`,
  },
  {
    header: 'Questionnaire Email Template',
    content: `<div>
        <p>Hey [Customer],</p>
        <br/>
        <p>Thanks for your recent purchase with us! I hope you're enjoying your [product/service].</p>
        <p>I‘d love to hear more about your experience working with our team. So please fill out the following survey and give us your honest feedback. I promise it’s short, and it‘ll help improve customers’ experiences in the future.</p>
        <p>I know your time is valuable, and I appreciate your attention.</p>
        <br/>
        <p>Thanks,</p>
        <p>[Your name]</p>
        <br/>
        <p>&lt;&lt; Attach questionnaire &gt;&gt;</p>
        </div>`,
  },
  {
    header: 'Feedback Appreciation Email Template',
    content: `<div>
        <p>Hi [Customer Name],</p>
        <br/>
        <p>Thank you so much for taking the time to fill out our questionnaire. We’re always looking to improve the quality of our offerings, and we’re happy that you’re a part of that.</p>
        <br/>
        <p>Thanks again,</p>
        <p>[Your Brand/Service]</p>
        </div>`,
  },
  {
    header: 'Angry Customer Response Email Template',
    content: `<div>
        <p>[Customer],</p>
        <br/>
        <p>I am so sorry to hear that you have had such a poor experience that you no longer want to work with us.</p>
        <p>Customer satisfaction is always a number one priority for us. I‘m deeply sorry that that wasn’t clearly demonstrated to you.</p>
        <p>As much as I hate to see you go, I completely understand how upset you must feel. I apologize again for any trouble we may have caused you. Good luck with your business, and I wish you all the best.</p>
        <br/>
        <p>Let me know if you have any more questions, comments, or concerns.</p>
        <p>Best,</p>
        <br/>
        <p>[Your name]</p>
        </div>`,
  },
  {
    header: 'Customer Service Follow-up Email Template',
    content: `<div>
        <p>Hey [Customer],</p>
        <br/>
        <p>I hope you're enjoying your new product. I remember you were torn between two versions, but I firmly believe you went with the perfect choice for you.</p>
        <p>If you‘re interested, I’d love to hear more about how you‘re liking the product. Let me know some pros and cons and if there’s any way I can be of assistance to guide you through this process. I'm here for whatever you need and look forward to hearing from you soon.</p>
        <p>Cheers,</p>
        <br/>
        <p>[Your name]</p>
        </div>`,
  },
];

const StyledItemsContent = styled(FlexBox)`
  flex: 1;
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

export const InsertTemplate = (props: { editorType: string }) => {
  const [cannedResponse, setCannedResponse] = useState(templates);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCannedResponse, setSelectedCannedResponse] =
    useState<ICannedResponse | null>(null);

  const { setValue } = useFormContext();

  const open = Boolean(anchorEl);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCannedResponse(null);
  };

  const setEditorValue = useCallback(() => {
    if (selectedCannedResponse) {
      const currentValue = selectedCannedResponse.content;
      const parsedContent = currentValue.replace(
        /{{(.*?)}}/g,
        (_, key: string) => resultObject[key as keyof typeof resultObject] || ''
      );

      setValue(`${props.editorType}.editor`, parsedContent);
      handleClose();
    }
  }, [props.editorType, resultObject, selectedCannedResponse, setValue]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.value.length) {
      const filteredTemplates = templates.filter((item) =>
        item.header.toLowerCase().includes(ev.target.value.toLowerCase())
      );
      setCannedResponse(filteredTemplates);
    } else {
      setCannedResponse(templates);
    }
  };

  return (
    <>
      <CustomIconButton
        onClick={handleClick}
        iconComponent={<InsertCommentOutlinedIcon />}
        tooltipProps={{ title: t('insert_template'), arrow: true }}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle sx={{ fontSize: '16px' }}>Canned Response</DialogTitle>
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
            <StyledItemsContent flexDirection="column">
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
              <FlexBox
                flexDirection="column"
                style={{ maxHeight: '350px', overflowY: 'scroll' }}
              >
                {cannedResponse.map((item, index) => (
                  <StyledItem
                    key={index}
                    onClick={() => setSelectedCannedResponse(item)}
                    title={item.header}
                    isSelected={selectedCannedResponse?.header === item.header}
                  >
                    <span title={item.header}>{item.header}</span>
                  </StyledItem>
                ))}
              </FlexBox>
            </StyledItemsContent>
            <StyledCannedResponseContent flexDirection="column" gap="20px">
              {!selectedCannedResponse ? (
                <Typography variant="h5" style={{ margin: 'auto' }}>
                  No canned response selected
                </Typography>
              ) : (
                <>
                  <Typography variant="h5">
                    {selectedCannedResponse?.header}
                  </Typography>
                  <Typography variant="caption">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedCannedResponse?.content ?? '',
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
    </>
  );
};
