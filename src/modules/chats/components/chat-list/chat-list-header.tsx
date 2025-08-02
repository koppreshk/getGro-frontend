import { CircularProgress } from '@mui/material';
import { FlexBox, RefreshButton } from 'lib/ui-ux';
import { Dispatch, SetStateAction } from 'react';

import { AddWhatsappChat } from './add-whatsapp-chat';
import { FilterChat } from './filter-chat';

export const ChatListHeader = (props: {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  isFetchingNextPage: boolean;
}) => {
  const { selectedOption, setSelectedOption, isFetchingNextPage } = props;
  return (
    <>
      <FlexBox justifyContent="space-between" width="100%" padding="15px">
        <FilterChat
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <FlexBox gap={'10px'}>
          {isFetchingNextPage ? <CircularProgress /> : <RefreshButton />}
          <AddWhatsappChat />
        </FlexBox>
      </FlexBox>
    </>
  );
};
