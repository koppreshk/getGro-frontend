import { FlexBox, GridLayout } from "lib/ui-ux"
import styled, { useTheme } from "styled-components";
import { FirstContactResolution } from "./first-contact-resolution";
import { Typography } from "@mui/material";
import { SLABreached } from "./sla-breached";
import { IAgentPerformance } from "modules/dashboard/apis";
import { SLAAchieved } from "./sla-achieved";

interface ISingleStatProps {
    value: string;
    subTextValue?: string;
    subHeading: string;
}

export const StyledLayout = styled(GridLayout)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    .single-stat-container:last-child {
        border-right: none;
    }
    .single-stat-container:first-child {
        padding: 0;
    }
`;

const StyledGridContainer = styled(GridLayout)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const AgentTicketStats = (props: { data: IAgentPerformance }) => {
    const { data: { tickets_created, ticket_assigned, total_resolved, total_closed, tickets_reopened,
        avg_first_response_time, avg_response_time, avg_resolution_time, sla_breached, fcr } } = props.data;

    const ticketData = [{
        value: tickets_created,
        subHeading: "Tickets Created"
    }, {
        value: ticket_assigned,
        subTextValue: "(0 avg per day dummy)",
        subHeading: "Tickets Assigned"
    }, {
        value: total_resolved,
        subTextValue: "(0 avg per day dummy)",
        subHeading: "Tickets Resolved"
    }, {
        value: total_closed,
        subHeading: "Tickets Closed"
    }, {
        value: tickets_reopened,
        subHeading: "Tickets Reopened"
    }];

    const data2 = [{
        value: avg_first_response_time,
        subHeading: "Avg First Response Time"
    }, {
        value: avg_response_time,
        subHeading: "Avg Response Time"
    }, {
        value: avg_resolution_time,
        subHeading: "Avg Resolution Time"
    }];

    return (
        <>
            <StyledLayout $gridTemplateColumns="repeat(5, 1fr)" $padding="20px">
                {ticketData.map((item) => <SingleStat subHeading={item.subHeading} value={item.value.toString()} key={item.subHeading} subTextValue={item.subTextValue} />)}
            </StyledLayout>
            <SLAAchieved />
            <SLABreached slaBreached={sla_breached} />
            <GridLayout $gridTemplateColumns="2fr 1fr" $gridGap="20px">
                <StyledGridContainer $padding="20px" $gridGap="20px">
                    <Typography variant="h5" >Average Figures</Typography>
                    <StyledLayout $gridTemplateColumns="repeat(3, 1fr)" $alignItems="center">
                        {data2.map((item) => <SingleStat subHeading={item.subHeading} value={item.value.toString()} key={item.subHeading} />)}
                    </StyledLayout>
                </StyledGridContainer>
                <FirstContactResolution fcr={fcr} />
            </GridLayout>
        </>
    )
}

const SingleStatContainer = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    padding-left: 30px;
`;

const SingleStat = (props: ISingleStatProps) => {
    const { value, subHeading, subTextValue } = props;
    const { pallete } = useTheme();
    return (
        <SingleStatContainer flexDirection="column" gap="15px" className="single-stat-container">
            <Typography sx={{ color: pallete.grayNeutral }} variant="body2">{subHeading}</Typography>
            <FlexBox alignItems="baseline" gap="4px">
                <Typography variant="h4">{value}</Typography>
                <Typography variant="body3">{subTextValue}</Typography>
            </FlexBox>
        </SingleStatContainer>
    )
}