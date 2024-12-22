import { Box, Tab, Tabs, Typography } from '@mui/material';
import { BreadCrumbs, CustomTabPanel, FlexBox } from 'lib/ui-ux';
import React, { ReactNode, FC } from 'react';
import styled, { useTheme } from 'styled-components';

interface AppConfigProps {
  children: ReactNode;
  className?: string;
}

interface HeaderComponentProps {
  children: ReactNode;
  appIcon: () => JSX.Element;
  appTitle: string;
  appDescription: string;
  className?: string;
}

interface BodyComponentProps {
  children: ReactNode;
  className?: string;
}

interface TabsPanelProps {
  version: string;
  publishedOn: string;
  lastUpdated: string;
  website: string;
  email: string;
  tabProps: {
    label: string;
    content: JSX.Element;
  }[];
}

const StyledFlexbox = styled(FlexBox)`
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: ${({ theme }) => theme.semantics.standardBorder};
`;

const BodyContainer = styled(FlexBox)`
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  border: ${({ theme }) => theme.semantics.standardBorder};
  min-height: 400px;
`;

const AppConfig: FC<AppConfigProps> & {
  Header: FC<HeaderComponentProps>;
  Body: FC<BodyComponentProps>;
  TabsPanel: FC<TabsPanelProps>;
} = ({ children, className }) => {
  return (
    <FlexBox
      className={className}
      flexDirection="column"
      padding="20px"
      width="100%"
    >
      <BreadCrumbs />
      <FlexBox flexDirection="column" gap="14px">
        {children}
      </FlexBox>
    </FlexBox>
  );
};

// Define the Header subcomponent
const Header: FC<HeaderComponentProps> = ({
  children,
  className,
  appDescription,
  appTitle,
  appIcon,
}) => {
  return (
    <StyledFlexbox
      className={className}
      justifyContent="space-between"
      width="100%"
      padding="20px"
    >
      <FlexBox alignItems="center" gap="12px">
        {appIcon()}
        <FlexBox flexDirection="column">
          <Typography variant="h5">{appTitle}</Typography>
          <Typography variant="caption">{appDescription}</Typography>
        </FlexBox>
      </FlexBox>
      {children}
    </StyledFlexbox>
  );
};

// Define the Body subcomponent
const Body: FC<BodyComponentProps> = ({ children, className }) => {
  return <BodyContainer className={className}>{children}</BodyContainer>;
};

const MoreInfoSection = styled(FlexBox)`
  margin-top: 48px;
  border-top: 1px solid #0000001f;
  border-left: 1px solid #0000001f;
`;

// Define the Body subcomponent
const TabsPanel: FC<TabsPanelProps> = ({
  email,
  lastUpdated,
  publishedOn,
  version,
  website,
  tabProps,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <FlexBox flexDirection="column" width="70%">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabProps.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        {tabProps.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </FlexBox>
      <MoreInfoSection width="30%" padding="20px 16px">
        <MoreInfoContent
          email={email}
          lastUpdated={lastUpdated}
          publishedOn={publishedOn}
          version={version}
          website={website}
        />
      </MoreInfoSection>
    </>
  );
};

interface IMoreInfoContentProps {
  version: string;
  publishedOn: string;
  lastUpdated: string;
  website: string;
  email: string;
}

function MoreInfoContent(props: IMoreInfoContentProps) {
  const { email, lastUpdated, publishedOn, version, website } = props;
  const { pallete } = useTheme();

  return (
    <FlexBox flexDirection="column" gap="8px">
      <Typography variant="h5">More Info</Typography>
      <FlexBox flexDirection="column">
        <Typography variant="body2" sx={{ color: pallete.grayNeutral }}>
          Version
        </Typography>
        <Typography variant="body2">{version}</Typography>
      </FlexBox>
      <FlexBox flexDirection="column">
        <Typography variant="body2" sx={{ color: pallete.grayNeutral }}>
          Published on
        </Typography>
        <Typography variant="body2">{publishedOn}</Typography>
      </FlexBox>
      <FlexBox flexDirection="column">
        <Typography variant="body2" sx={{ color: pallete.grayNeutral }}>
          Last Updated
        </Typography>
        <Typography variant="body2">{lastUpdated}</Typography>
      </FlexBox>
      <Typography variant="h5">Support</Typography>
      <FlexBox flexDirection="column">
        <Typography variant="body2" sx={{ color: pallete.grayNeutral }}>
          Website
        </Typography>
        <Typography variant="body2">{website}</Typography>
      </FlexBox>
      <FlexBox flexDirection="column">
        <Typography variant="body2" sx={{ color: pallete.grayNeutral }}>
          Email
        </Typography>
        <Typography variant="body2">{email}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

// Assign Header and Body as subcomponents of AppConfig
AppConfig.Header = Header;
AppConfig.Body = Body;
AppConfig.TabsPanel = TabsPanel;

export default AppConfig;
