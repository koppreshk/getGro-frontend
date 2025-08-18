import { CircularProgress, Typography } from '@mui/material';
import { t } from 'i18next';
import { FlexBox, RefreshButton } from 'lib/ui-ux';
import { Dispatch, SetStateAction } from 'react';

import { FilterChat } from './filter-chat';
import { AddWhatsappTemplate } from './whatsapp-template/add-whatsapp-template';

export const ChatListHeader = (props: {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  isFetchingNextPage: boolean;
}) => {
  const { selectedOption, setSelectedOption, isFetchingNextPage } = props;
  return (
    <>
      <FlexBox justifyContent="space-between" width="100%" padding="15px">
        <FlexBox alignItems="center" gap={'4px'}>
          <Typography variant="h5">{t('chat')}</Typography>
          {isFetchingNextPage ? <CircularProgress /> : <RefreshButton />}
          <FilterChat
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </FlexBox>
        <FlexBox gap={'10px'}>
          <AddWhatsappTemplate />
        </FlexBox>
      </FlexBox>
    </>
  );
};
