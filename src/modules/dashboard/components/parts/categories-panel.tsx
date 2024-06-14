import React from "react";
import styled, { css, useTheme } from "styled-components";
import { Box, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { Widgets } from "@mui/icons-material";
import { AgentPerformanceDashContainer, TicketMonitoringDashContainer, SupportMonitoringDashContainer, SLADashboardContainer } from "modules/dashboard/container";

interface IDashboardCategories {
    id: number;
    name: string;
    component: JSX.Element;
}

const StyledBox = styled(Box)`
    position: sticky;
    top: -1px;
    z-index: 1;
    padding: 12px 25px 0px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
`;

const dashboardCategories: IDashboardCategories[] = [
    {
        id: 1,
        name: "Tickets Monitor",
        component: <TicketMonitoringDashContainer />,
    },
    {
        id: 2,
        name: 'Support Monitoring',
        component: <SupportMonitoringDashContainer />
    },
    {
        id: 3,
        name: "Agent Performance",
        component: <AgentPerformanceDashContainer />,
    },
    {
        id: 4,
        name: "SLA Dashboard",
        component: <SLADashboardContainer />,
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { value, index, ...other } = props;

    const selectedTab = dashboardCategories.find((category) => category.id === value);

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

const StyledText = styled(Typography) <{ $isSelected: boolean }>`
    &&{
            &:before, &:after {
                content: '';
            }
            
            padding: 10px 40px; 
            text-decoration: none;
            font-weight: ${({ $isSelected }) => $isSelected ? '500' : '400'};
            &:hover {
                color: ${({ $isSelected, theme }) => !$isSelected && theme.pallete.white};
            }

            ${({ $isSelected }) => {
                if ($isSelected) {
                    return css`
                                        &:before, &:after {
                                            width: 10px;
                                            height: 10px;
                                            background: ${({ theme }) => theme.pallete.grayVariant5};
                                            position: absolute;
                                            bottom: 0px;
                                            z-index: 2;
                                        }
                                        &:before {
                                            left: -10px;
                                        }
                                        &:after {
                                            right: -10px;
                                        }
                                    `;
                }
    }
    }
    }
`;

const TabPillWrapper = styled(FlexBox) <{ $isSelected: boolean, $isFirst: boolean, $isLast: boolean }>`
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: relative;

    &:before, &:after {
        content: '';
    }

    ${({ $isSelected, $isFirst, $isLast }) => {
        if ($isSelected) {
            return css`
                    &:before, &:after {
                        width: 19px;
                        height: 19px;
                        background: ${({ theme }) => theme.pallete.grayVariant1};
                        border-radius: 100%;
                        position: absolute;
                        bottom: 0px;
                        z-index: 3;
                    }
                    &:before {
                        background: ${({ theme }) => $isFirst && theme.pallete.white};
                        left: -23px;
                    }
                    &:after {
                        background: ${({ theme }) => $isLast && theme.pallete.white};
                        right: -23px;
                    }
                    `;
        }
    }}
    
    cursor: pointer;
    background-color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.grayVariant5 : theme.pallete.grayVariant1};

    &:hover{
        z-index: 10;
        background-color: ${({ $isSelected, theme }) => $isSelected ? '' : theme.pallete.grayVariant2};
    }
`;

const StyledWrapper = styled(FlexBox)`
    .tab-pill:first-child {
        color: blue;
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
    const isSelected = value === id;

    return (
        <TabPillWrapper className='tab-pill' onClick={() => onClickHandler(id)} justifyContent="space-between" alignItems="center" id={`dashboard-tab-${id}`} $isSelected={isSelected} $isFirst={value === 1} $isLast={value === 4}>
            <StyledText variant="caption" $isSelected={isSelected}>{label}</StyledText>
        </TabPillWrapper>
    )
}

export const DashboardCategoriesPanel = () => {
    const [value, setValue] = React.useState(1);
    const { pallete } = useTheme();

    const onClickHandler = (id: number) => {
        setValue(id);
    };

    return (
        <>
            <StyledBox>
                <FlexBox aria-label="dashboard categories tabs" gap='10px' flexDirection="row" alignItems="center">
                    <FlexBox alignItems="center" gap="5px" padding="0 12px 0 0">
                        <Widgets color="primary" />
                        <Typography variant="h4" sx={{ color: pallete.grayVariant2 }} >Dashboards</Typography>
                    </FlexBox>
                    <StyledWrapper style={{ position: 'relative' }} gap='4px'>
                        {dashboardCategories.map((category) => {
                            return <TabPill key={category.id} label={category.name} id={category.id} onClickHandler={onClickHandler} value={value} />
                        })}
                    </StyledWrapper>
                </FlexBox>
            </StyledBox>
            <Box sx={{ width: '100%', background: pallete.grayVariant5, paddingTop: '12px' }}>
                <CustomTabPanel index={value} value={value} />
            </Box >
        </>
    )
}

