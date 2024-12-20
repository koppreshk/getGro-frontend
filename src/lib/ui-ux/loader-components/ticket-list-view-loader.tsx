import { Skeleton } from '@mui/material';

import { FlexBox } from '../flexbox/flexbox';

export const TicketListViewLoader = () => {
  return (
    <>
      {Array(10)
        .fill({})
        .map((_item, index) => (
          <FlexBox gap="10px" height="100px" key={index}>
            <FlexBox width="60px" justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
            </FlexBox>
            <FlexBox gap="8px" flexDirection="column" width="calc(100% - 80px)">
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </FlexBox>
          </FlexBox>
        ))}
    </>
  );
};
