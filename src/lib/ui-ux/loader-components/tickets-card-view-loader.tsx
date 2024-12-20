import { Skeleton } from '@mui/material';

import { FlexBox } from '../flexbox/flexbox';

export const TicketsCardViewLoader = () => {
  return (
    <FlexBox width="100%" height="100%" flexDirection="column" gap={'20px'}>
      {Array(4)
        .fill({})
        .map((_item, index) => (
          <FlexBox
            gap="10px"
            height="133px"
            key={index}
            padding="15px 20px"
            alignItems="center"
          >
            <FlexBox width="60px" justifyContent="center" alignItems="center">
              <Skeleton variant="rounded" width={52} height={52} />
            </FlexBox>
            <FlexBox gap="8px" flexDirection="column" width="calc(80% - 80px)">
              <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            </FlexBox>
            <FlexBox gap="8px">
              <Skeleton variant="rounded" width={'100px'} height={'40px'} />
              <Skeleton variant="rounded" width={'100px'} height={'40px'} />
            </FlexBox>
          </FlexBox>
        ))}
    </FlexBox>
  );
};
