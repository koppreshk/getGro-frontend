import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, ArrowBack } from '@mui/icons-material';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox, CustomIconButton } from 'lib/ui-ux';
import { TicketTagsContainer } from 'modules/settings/containers';
import React from "react";
import { useNavigate } from 'react-router-dom';

export const TagsChannelLayout = () => {
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <FlexBox alignItems="center" gap="10px" padding='10px'>
                <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                <Typography variant="h5">Ticket Tags</Typography>
            </FlexBox>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab icon={<Facebook />} label="Facebook" value={1} />
                <Tab icon={<Email />} label="Email" value={2} />
                <Tab icon={<WhatsApp />} label="WhatsApp" value={3} />
                <Tab icon={<Twitter />} label="Twitter" value={4} />
                <Tab icon={<LocalPhone />} label="Telephone" value={5} />
                <Tab icon={<Instagram />} label="Instagram" value={6} />
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
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
