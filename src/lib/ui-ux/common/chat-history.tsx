import { Avatar, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { chooseRandomColors, getInitialsByName, getTimeAgo } from 'lib/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';

const TimeLine = styled.div`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
  margin: 3px 0;
`;

const FlexContainer = styled(FlexBox)`
  overflow-y: auto;
  padding: 20px;
`;

interface ChatHistoryProps {
  historyData: {
    created_at: string;
    history: string;
    user: string;
  }[];
  useTimeAgoDate?: boolean;
  className?: string;
}

const UserAvatar = (props: { userName: string }) => {
  const { userName } = props;
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(userName)),
    [userName]
  );

  return (
    <Avatar
      sx={{
        color: textColor,
        bgcolor: backgroundColor,
        width: '34px',
        height: '34px',
        fontSize: '13px',
        fontWeight: 500,
      }}
    >
      {getInitialsByName(userName)}
    </Avatar>
  );
};

export const ChatHistory = (props: ChatHistoryProps) => {
  const { historyData, useTimeAgoDate, className } = props;
  const { pallete } = useTheme();
  const { t } = useTranslation();

  return (
    <FlexContainer
      className={className}
      flexDirection="column"
      width="100%"
      height="100%"
    >
      {historyData.map((item, index) => (
        <FlexBox flexDirection="row" key={item.created_at + index}>
          <FlexBox flexDirection="column" alignItems="center">
            <UserAvatar userName={item.user} />
            {index < historyData.length - 1 && <TimeLine />}
          </FlexBox>

          <FlexBox
            flexDirection="column"
            gap="6px"
            padding="0 10px 15px"
            width="90%"
          >
            <FlexBox flexDirection="column">
              <Typography variant="h6">{item.user}</Typography>
              <Typography variant="caption" sx={{ color: pallete.grayNeutral }}>
                {t('made_changes')} -{' '}
                {useTimeAgoDate ? getTimeAgo(item.created_at) : item.created_at}
              </Typography>
            </FlexBox>
            <Typography variant="caption">{item.history}</Typography>
          </FlexBox>
        </FlexBox>
      ))}
    </FlexContainer>
  );
};
