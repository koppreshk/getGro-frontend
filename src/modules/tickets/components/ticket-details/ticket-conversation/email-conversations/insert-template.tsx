import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  PostAddOutlined,
} from '@mui/icons-material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const templates = [
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

export const InsertTemplate = (props: { editorType: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTemplateIndex, setTemplateIndex] = useState(0);
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
  };

  const onNextClick = () => {
    setTemplateIndex((prevValue) => prevValue + 1);
  };

  const onPreviousClick = () => {
    setTemplateIndex((prevValue) => prevValue - 1);
  };

  const setEditorValue = useCallback(() => {
    const currentValue = templates[selectedTemplateIndex].content;
    const parsedContent = currentValue.replace(
      /{{(.*?)}}/g,
      (_, key: string) => resultObject[key as keyof typeof resultObject] || ''
    );

    setValue(`${props.editorType}.editor`, parsedContent);
    handleClose();
  }, [props.editorType, resultObject, selectedTemplateIndex, setValue]);

  return (
    <>
      <IconButton onClick={handleClick} title={t('insert_canned_response')}>
        <InsertCommentOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {templates[selectedTemplateIndex].header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="caption">
              <div
                dangerouslySetInnerHTML={{
                  __html: templates[selectedTemplateIndex].content,
                }}
              />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <FlexBox>
            <CustomIconButton
              tooltipProps={{ title: 'Previous template' }}
              iconComponent={<ChevronLeftOutlined />}
              onClick={onPreviousClick}
              disabled={selectedTemplateIndex === 0}
            />
            <CustomIconButton
              tooltipProps={{ title: 'Next template' }}
              iconComponent={<ChevronRightOutlined />}
              onClick={onNextClick}
              disabled={selectedTemplateIndex + 1 === templates.length}
            />
          </FlexBox>
          <Button
            variant="contained"
            endIcon={<PostAddOutlined />}
            onClick={setEditorValue}
          >
            {t('insert_canned_response')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
