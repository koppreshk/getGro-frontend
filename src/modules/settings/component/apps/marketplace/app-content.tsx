import React from "react";
import styled, { useTheme } from 'styled-components'
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"

const StyledFlexbox = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

const MoreInfoSection = styled(FlexBox)`
    margin-top: 48px;
    border-top:  1px solid #0000001f;
    border-left: 1px solid #0000001f;
`;

function tabAriaProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface IAppContentProps {
    version: string;
    publishedOn: string;
    lastUpdated: string;
    website: string;
    email: string;
    manageBtnClicked: boolean;
    onManageRenderContent?: () => React.ReactNode;
    OverviewContents(): JSX.Element;
    InstallationContents(): JSX.Element;
}

export const AppContent = (props: IAppContentProps) => {
    const { InstallationContents, OverviewContents, email, lastUpdated, publishedOn, version, website, manageBtnClicked, onManageRenderContent } = props;

    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledFlexbox>
            {
                manageBtnClicked && onManageRenderContent
                    ? onManageRenderContent()
                    :
                    <>
                        <FlexBox flexDirection="column" width="70%">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Overview" {...tabAriaProps(0)} />
                                    <Tab label="Installation" {...tabAriaProps(1)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                {OverviewContents()}
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                {InstallationContents()}
                            </CustomTabPanel>
                        </FlexBox>
                        <MoreInfoSection width="30%" padding="20px 16px">
                            <MoreInfoContent
                                email={email} lastUpdated={lastUpdated}
                                publishedOn={publishedOn} version={version}
                                website={website} />
                        </MoreInfoSection>
                    </>}
        </StyledFlexbox>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface IMoreInfoProps {
    version: string;
    publishedOn: string;
    lastUpdated: string;
    website: string;
    email: string;
}

function MoreInfoContent(props: IMoreInfoProps) {
    const { email, lastUpdated, publishedOn, version, website } = props;
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="8px">
            <Typography variant="h5">
                More Info
            </Typography>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Version</Typography>
                <Typography variant="body2" >{version}</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Published on</Typography>
                <Typography variant="body2" >{publishedOn}</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Last Updated</Typography>
                <Typography variant="body2" >{lastUpdated}</Typography>
            </FlexBox>
            <Typography variant="h5">
                Support
            </Typography>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Website</Typography>
                <Typography variant="body2" >{website}</Typography>
            </FlexBox>
            <FlexBox flexDirection="column">
                <Typography variant="body2" sx={{ color: pallete.grayNeutral }} >Email</Typography>
                <Typography variant="body2" >{email}</Typography>
            </FlexBox>
        </FlexBox>
    )
}