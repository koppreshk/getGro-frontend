import { ArrowBack } from '@mui/icons-material';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox, CustomIconButton, BreadCrumbs } from 'lib/ui-ux';
import { IChannels } from 'modules/settings/apis/tags';
import { TicketTagsContainer } from 'modules/settings/containers';
import { useSourceIcon } from 'modules/tickets/components';
import React from "react";
import { useNavigate } from 'react-router-dom';

export const TagsChannelLayout = (props: { channels: IChannels[] }) => {
    const { channels } = props;
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate();
    const getIcon = useSourceIcon();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <BreadCrumbs />
            <FlexBox alignItems="center" gap="10px" padding='10px'>
                <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                <Typography variant="h5">Ticket Tags</Typography>
            </FlexBox>
            <Tabs value={value} onChange={handleChange} centered>
                {channels.map((channel) => {
                    return <Tab icon={getIcon(channel.name)} key={channel.channel_id} label={channel.name} value={channel.channel_id} />
                })}
            </Tabs>
            <CustomTabPanel index={value} value={value}>
                <TicketTagsContainer channelId={value} />
            </CustomTabPanel>
        </Box>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
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
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
