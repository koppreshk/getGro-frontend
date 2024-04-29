import React, { useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material"
import { AgentPerformanceDashContainer, TicketMonitoringDashContainer } from "modules/dashboard/container";
import styled, { useTheme } from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { Widgets } from "@mui/icons-material";

interface IDashboardCategories {
    id: number;
    name: string;
    component: JSX.Element;
}

const StyledTabs = styled(Tabs)`
   /* &&{
     .MuiTabs-indicator {
        display: flex;
        justify-content: center;
        background-color: transparent;
      }

      .MuiTabs-indicatorSpan {
        max-width: 40;
        width: 100%;
        background-color: #635ee7;
    }
    } */
`;

const DashboardCategories: IDashboardCategories[] = [
    {
        id: 1,
        name: "Tickets Monitor",
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
        name: "CSR Dashboard",
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
                <StyledTabs value={value} onChange={handleChange} aria-label="dashboard categories tabs" >
                    {DashboardCategories.map((category) => {
                        return <Tab key={category.id} label={category.name} id={`dashboard-tab-${category.id}`} value={category.id} sx={{ textTransform: 'none' }} />
                    })}
                </StyledTabs>
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


const TabPillWrapper = styled(FlexBox) <{ $isSelected: boolean }>`
    border-radius: 20px;
    cursor: pointer;
    background-color: ${({ $isSelected, theme}) => $isSelected ? theme.pallete.primaryPurple : '#e5e5ea'};
    color: ${({ $isSelected, theme}) => $isSelected ? theme.pallete.white : 'black'};
`;

interface ITabPillProps {
    label: string;
    id: number;
    onClickHandler: (id: number) => void;
    value: number
}

const TabPill = (props: ITabPillProps) => {
    const { label, id, onClickHandler, value } = props;
    const [isSelected, setIsSelected] = React.useState(false)
    const { pallete } = useTheme();

    useEffect(() => {
        setIsSelected(() => value === id);
    }, [id, value]);

    return (
        <TabPillWrapper onClick={() => onClickHandler(id)} padding="10px 15px" justifyContent="space-between" alignItems="center" id={`dashboard-tab-${id}`} $isSelected={isSelected}>
            <Typography variant="caption" sx={{ color: `${isSelected ? pallete.white : pallete.grayVariant2}`  }}>{label}</Typography>
        </TabPillWrapper>
    )
}

export const DashboardCategoriesPanel2 = () => {
    const [value, setValue] = React.useState(1);
    

    const onClickHandler = (id: number) => {
        setValue(id);
    };

    const { pallete } = useTheme();

    return (
        <>
            <Box sx={{ padding: '0px 25px' }}>
                <FlexBox aria-label="dashboard categories tabs" gap='10px' flexDirection="row" alignItems="center">
                    <FlexBox alignItems="center" gap="5px" padding="0 12px 0 0">
                        <Widgets color="primary" />
                        <Typography variant="h4" sx={{ color: pallete.grayVariant2 }} >Dashboards</Typography>
                    </FlexBox>

                    {DashboardCategories.map((category) => {
                        return <TabPill key={category.id} label={category.name} id={category.id} onClickHandler={onClickHandler} value={value}/>
                    })}
                </FlexBox>
            </Box>
            <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <CustomTabPanel index={value} value={value} />
            </Box >
        </>
    )
}

