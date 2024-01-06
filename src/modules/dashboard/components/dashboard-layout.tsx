import { useState } from "react";
import { Tabs, Tab } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components";
import { AgentPerformance } from "./parts/agent.performance";

export const DashboardLayout = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <FlexBox $flexDirection="column" $height="calc(100% - 43px)">
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Agent Performance" id="agent-performance" />
                <Tab label="Folder Performance" id="folder-performance" />
                <Tab label="Queue Performance" id="queue-performance" />
                <Tab label="Time Wise Dashboard" id="time-wise-dashboard" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <AgentPerformance />
            </CustomTabPanel>
        </FlexBox>
    )
}

const Container = styled.div`
    height: calc(100% - 48px);
    padding: 16px;
    box-sizing: border-box;
    max-height: 400px;
    background-color: ${({ theme }) => theme.pallete.genericBackgroundColor};
`
function CustomTabPanel(props: {
    children?: React.ReactNode;
    index: number;
    value: number;
}) {
    const { children, value, index } = props;

    return (
        <Container
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}>
            {value === index && (
                <>{children}</>
            )}
        </Container>
    );
}