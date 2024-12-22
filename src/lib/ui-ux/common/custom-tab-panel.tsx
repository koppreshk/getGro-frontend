import { FlexBox, IFlex } from '../flexbox/flexbox';

interface TabPanelProps extends IFlex {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const {
    children,
    value,
    index,
    height = 'calc(100% - 49px)',
    width = '100%',
    flexDirection = 'row',
    padding = '16px',
    ...other
  } = props;

  if (value === index) {
    return (
      <FlexBox
        role="tabpanel"
        hidden={value !== index}
        height={height}
        width={width}
        padding={padding}
        flexDirection={flexDirection}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </FlexBox>
    );
  }
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
