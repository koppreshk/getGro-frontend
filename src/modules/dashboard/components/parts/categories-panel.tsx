import React from "react";
import { Box, Tab, Tabs } from "@mui/material"
import { AgentPerformanceDashContainer, TicketMonitoringDashContainer } from "modules/dashboard/container";

interface IDashboardCategories {
    id: number;
    name: string;
    component: JSX.Element;
}

const DashboardCategories: IDashboardCategories[] = [
    {
        id: 1,
        name: "Ticket Monitoring Dashboard",
        component: <TicketMonitoringDashContainer />,
    },
    {
        id: 2,
        name: "Agent Performance",
        component: <AgentPerformanceDashContainer />,
    },
    {
        id: 3,
        name: "SLA Dashboard",
        component: <AgentPerformanceDashContainer />,
    },
    {
        id: 4,
        name: "Customer Satisfaction Report",
        component: <AgentPerformanceDashContainer />,
    },
    {
        id: 5,
        name: "Ticket Conversation Report",
        component: <AgentPerformanceDashContainer />,
    },
];

export const DashboardCategoriesPanel = () => {
    const [value, setValue] = React.useState(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: '#cccc', bgcolor: '#ffff', padding: '0px 25px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="dashboard categories tabs">
                    {DashboardCategories.map((category) => {
                        return <Tab key={category.id} label={category.name} id={`dashboard-tab-${category.id}`} value={category.id} sx={{ textTransform: 'none' }} />
                    })}
                </Tabs>
            </Box>
            <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <CustomTabPanel index={value} value={value} />
            </Box >
        </>
    )
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { value, index, ...other } = props;

    const selectedTab = DashboardCategories.find((category) => category.id === value);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`dashboard-cat-tabpanel-${index}`}
            aria-labelledby={`dashboard-cat-tab-${index}`}
            {...other}
        >
            {selectedTab && selectedTab.component}
        </div>
    );
}
