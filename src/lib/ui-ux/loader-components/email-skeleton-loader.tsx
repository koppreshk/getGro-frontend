import { Skeleton, Typography } from '@mui/material';
import styled from 'styled-components';

import { FlexBox } from '..';

const SkeletonHeader = styled(FlexBox)`
  box-sizing: border-box;
  padding: 15px 10px;
  border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const EmailSkeletonLoader = () => {
  return (
    <FlexBox flexDirection="column" width="100%">
      <SkeletonHeader flexDirection="column">
        <Skeleton width="20%">
          <Typography variant="h5">.</Typography>
        </Skeleton>
        <FlexBox gap="5px">
          <Skeleton width="80%">
            <Typography variant="body2">.</Typography>
          </Skeleton>
        </FlexBox>
      </SkeletonHeader>

      <FlexBox
        width="100%"
        justifyContent="space-between"
        padding="15px 10px 0 10px"
      >
        <Skeleton width="20%">
          <Typography variant="h5">.</Typography>
        </Skeleton>
        <FlexBox gap="10px">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={20} height={20} />
        </FlexBox>
      </FlexBox>

      <FlexBox
        width="100%"
        padding="15px 10px 0 10px"
        flexDirection="column"
        gap="20px"
      >
        {Array(6)
          .fill({})
          .map((_item, index) => (
            <FlexBox gap="10px" key={index}>
              <Skeleton variant="circular" width={40} height={40} />
              <FlexBox
                flexDirection="column"
                width="calc(100% - 50px)"
                gap="5px"
              >
                <FlexBox width="100%" justifyContent="space-between">
                  <Skeleton width="20%">
                    <Typography variant="h5">.</Typography>
                  </Skeleton>
                  <Skeleton width="20%">
                    <Typography variant="body2">.</Typography>
                  </Skeleton>
                </FlexBox>
                <Skeleton width="100%">
                  <Typography variant="h5">.</Typography>
                </Skeleton>
              </FlexBox>
            </FlexBox>
          ))}
      </FlexBox>
    </FlexBox>
  );
};
