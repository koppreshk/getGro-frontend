import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Typography } from "@mui/material"
import { FlexBox, RefreshButton } from "lib/ui-ux";
import { Widgets } from "@mui/icons-material";
import { AgentPerformanceDashContainer, SupportMonitoringDashContainer, SLADashboardContainer } from "modules/dashboard/container";
import { Trans, useTranslation } from "react-i18next";
import { useFeature } from "lib/hooks";

interface IDashboardCategories {
    id: number;
    name: string;
    component: JSX.Element;
    hidden?: boolean;
}

const StyledBox = styled(Box)`
    position: sticky;
    top: -1px;
    z-index: 1;
    padding: 12px 25px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(241, 242, 244, 0.6);
`;

const useDashboardCategories = () => {

    const isFeatureAccessible = useFeature<undefined>();
    const dashboardCategories: IDashboardCategories[] = [
        // {
        //     id: 1,
        //     name: "Tickets Monitor",
        //     component: <TicketMonitoringDashContainer />,
        // },
        {
            id: 2,
            name: 'supportMonitoring',
            component: <SupportMonitoringDashContainer />,
            hidden: !isFeatureAccessible('support_monitoring')
        },
        {
            id: 3,
            name: "agentPerformance",
            component: <AgentPerformanceDashContainer />,
            hidden: !isFeatureAccessible('agent_performance')
        },
        {
            id: 4,
            name: "slaDashboard",
            component: <SLADashboardContainer />,
            hidden: !isFeatureAccessible('sla_dashboard')
        },
        // {
        //     id: 5,
        //     name: "CSR Dashboard",
        //     component: <AgentPerformanceDashContainer />,
        // },
        // {
        //     id: 6,
        //     name: "Ticket Conversation Report",
        //     component: <AgentPerformanceDashContainer />,
        // },
    ];

    return dashboardCategories; 
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { value, index, ...other } = props;
    const dashboardCategories = useDashboardCategories();

    const selectedTab = dashboardCategories.filter((item) => !item.hidden).find((category) => category.id === value);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            style={{ height: '100%' }}
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
    background-color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.primaryPurple : '#e5e5ea'};
    color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.white : 'black'};

    &:hover{
        background-color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.primaryPurple : '#dcdce1'};
    }
`;

interface ITabPillProps {
    label: string;
    id: number;
    value: number;
    onClickHandler: (id: number) => void;
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
            <Typography variant="caption" sx={{ color: `${isSelected ? pallete.white : pallete.grayVariant2}` }}>{label}</Typography>
        </TabPillWrapper>
    )
}

export const DashboardCategoriesPanel = () => {
    const [value, setValue] = React.useState(2);
    const { pallete } = useTheme();
    const { t } = useTranslation();
    const dashboardCategories = useDashboardCategories();

    const onClickHandler = (id: number) => {
        setValue(id);
    };

    return (
        <>
            <StyledBox>
                <FlexBox aria-label="dashboard categories tabs" alignItems="center" justifyContent="space-between">
                    <FlexBox gap='10px' flexDirection="row" alignItems="center">
                        <FlexBox alignItems="center" gap="5px" padding="0 12px 0 0">
                            <Widgets color="primary" />
                            <Typography variant="h4" sx={{ color: pallete.grayVariant2 }} ><Trans i18nKey="modules.dashboard.moduleHeading" /></Typography>
                        </FlexBox>
                        {dashboardCategories.filter((item) => !item.hidden).map((category) => {
                            return <TabPill key={category.id} label={t(`modules.dashboard.sectionHeadings.${category.name}`)} id={category.id} onClickHandler={onClickHandler} value={value} />
                        })}
                    </FlexBox>
                    <RefreshButton />
                </FlexBox>
            </StyledBox>
            <Box sx={{ width: '100%', height: '100%' }}>
                <CustomTabPanel index={value} value={value} />
            </Box >
        </>
    )
}

