import { Backdrop, CircularProgress } from '@mui/material';

import { FlexBox, IFlexBoxProps } from '../flexbox/flexbox';

export const CenteredCircularProgress = (props: IFlexBoxProps) => {
  const { height = '100%', width = '100%', ...rest } = props;
  return (
    <FlexBox
      {...rest}
      alignItems="center"
      justifyContent="center"
      height={height}
      width={width}
    >
      <CircularProgress />
    </FlexBox>
  );
};

export const PageBlockingLoader = (props: { loading: boolean }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={props.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
