import {
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';

interface ICustomIconButtonProps extends IconButtonProps {
  tooltipProps: Omit<TooltipProps, 'children'>;
  className?: string;
  iconComponent: JSX.Element;
}

export const CustomIconButton = (props: ICustomIconButtonProps) => {
  const { tooltipProps, iconComponent, ...rest } = props;
  return (
    <Tooltip {...tooltipProps}>
      <IconButton {...rest}>{iconComponent}</IconButton>
    </Tooltip>
  );
};
