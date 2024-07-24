import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CustomTabPanel, a11yProps } from 'lib/ui-ux';
import { ChooseConditionForm } from './choose-condition-form';
import { AssociateAgent } from './associate-agent';

export const AddRule = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box', height: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Choose Condition" {...a11yProps(0)} />
                        <Tab label="Associate Agent" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ChooseConditionForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <AssociateAgent />
                </CustomTabPanel>
            </Box>
        </>
    )
}