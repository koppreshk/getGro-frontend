import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { FlexBox, RefreshButton } from 'lib/ui-ux';
import { Dispatch, SetStateAction, useState } from 'react';
import { Trans } from 'react-i18next';

import { FilterChat } from './filter-chat';

const filters = [
  { key: 'all-conversations' },
  { key: 'my-pending' },
  { key: 'my-unsolved' },
  { key: 'my-conversations' },
  { key: 'all-unassigned' },
  { key: 'all-unsolved' },
];

export const ChatListHeader = (props: {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) => {
  const { selectedOption, setSelectedOption } = props;
  const [selectedView, setSelectedView] = useState('all-conversations');

  return (
    <>
      <FlexBox
        justifyContent="space-between"
        width="100%"
        padding="15px 0px 15px 15px"
      >
        <FlexBox gap={'10px'}>
          <FormControl size="small">
            <InputLabel id="demo-select-small-label">{t('view')}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small-label"
              value={selectedView}
              label="Views"
              onChange={(ev) => setSelectedView(ev.target.value)}
            >
              {filters.map((item) => (
                <MenuItem key={item.key} value={item.key}>
                  <Typography variant="h5">
                    <Trans i18nKey={item.key.split('-').join('_')} />
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FilterChat
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </FlexBox>
        <RefreshButton />
      </FlexBox>
    </>
  );
};
