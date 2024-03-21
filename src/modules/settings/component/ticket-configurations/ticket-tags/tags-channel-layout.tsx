import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram } from '@mui/icons-material';
import { Box, Tab, Tabs } from "@mui/material";
import { TicketTagsContainer } from 'modules/settings/containers';
import React from "react";

export const TagsChannelLayout = () => {
    const [value, setValue] = React.useState(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab icon={<Facebook />} label="Facebook" value={1} />
                <Tab icon={<Email />} label="Email" value={2} />
                <Tab icon={<WhatsApp />} label="WhatsApp" value={3} />
                <Tab icon={<Twitter />} label="Twitter" value={4} />
                <Tab icon={<LocalPhone />} label="Telephone" value={5} />
                <Tab icon={<Instagram />} label="Instagram" value={6} />
            </Tabs>
            <>
                <CustomTabPanel index={value} value={value}>
                    <TicketTagsContainer value={value} />
                </CustomTabPanel>
            </>
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
