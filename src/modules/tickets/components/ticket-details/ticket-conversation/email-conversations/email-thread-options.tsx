import { TurnLeft } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import { useFeature } from 'lib/hooks';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface IEmailThreadOptionsProps {
  onReplyClick: React.MouseEventHandler<HTMLButtonElement>;
  onForwardClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const EmailThreadOptions = (props: IEmailThreadOptionsProps) => {
  const { onReplyClick } = props;
  const { t } = useTranslation();
  const showReplyTicket = useFeature('reply_ticket');

  const threadOptions = useMemo(
    () => [
      {
        title: t('reply'),
        onClick: onReplyClick,
        renderIcon: () => <TurnLeft />,
        hidden: !showReplyTicket,
      },
      // {
      //   title: t('forward'),
      //   onClick: onForwardClick,
      //   renderIcon: () => <TurnRight />,
      // },
    ],
    [onReplyClick, showReplyTicket, t]
  );

  return (
    <>
      {threadOptions.map((option) => (
        <React.Fragment key={option.title}>
          {option.hidden ? null : (
            <Tooltip title={option.title} arrow placement="bottom">
              <IconButton
                sx={{ padding: 0 }}
                className="no-print"
                onClick={option.onClick}
              >
                {option.renderIcon()}
              </IconButton>
            </Tooltip>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
