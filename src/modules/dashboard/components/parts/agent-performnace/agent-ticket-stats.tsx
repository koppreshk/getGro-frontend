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

    const { first_response_achieved, resolution_achieved, next_response_achieved, first_response_breach_str, first_response_breached, next_response_breach_str, next_response_breached,
        resolution_breach_str, resolution_breached, tickets_created, tickets_assigned, tickets_resolved, tickets_closed, tickets_reopened,
        average_first_response_time, average_next_response_time, average_resolution_time, fcr, average_assigned_per_day, average_resolved_per_day, first_response_str
        , next_response_str, resolution_str } = props.data.data_v1;

    const ticketData = [{
        value: tickets_created,
        subHeading: "Tickets Created"
    }, {
        value: tickets_assigned,
        subTextValue: `(${average_assigned_per_day} avg per day)`,
        subHeading: "Tickets Assigned"
    }, {
        value: tickets_resolved,
        subTextValue: `(${average_resolved_per_day} avg per day)`,
        subHeading: "Tickets Resolved"
    }, {
        value: tickets_closed,
        subHeading: "Tickets Closed"
    }, {
        value: tickets_reopened,
        subHeading: "Tickets Reopened"
    }];

    const data2 = [{
        value: average_first_response_time,
        subHeading: "Avg First Response Time"
    }, {
        value: average_next_response_time,
        subHeading: "Avg Next Response Time"
    }, {
        value: average_resolution_time,
        subHeading: "Avg Resolution Time"
    }];

    return (
        <>
            <StyledLayout $gridTemplateColumns="repeat(5, 1fr)" $padding="20px">
                {ticketData.map((item) => <SingleStat subHeading={item.subHeading} value={item.value.toString()} key={item.subHeading} subTextValue={item.subTextValue?.toString()} />)}
            </StyledLayout>
            <SLAAchieved
                first_response_achieved={first_response_achieved}
                next_response_achieved={next_response_achieved}
                resolution_achieved={resolution_achieved}
                first_response_str={first_response_str}
                next_response_str={next_response_str}
                resolution_str={resolution_str} />
            <SLABreached
                first_response_achieved={first_response_achieved}
                first_response_breach_str={first_response_breach_str}
                first_response_breached={first_response_breached}
                next_response_achieved={next_response_achieved}
                next_response_breach_str={next_response_breach_str}
                next_response_breached={next_response_breached}
                resolution_achieved={resolution_achieved}
                resolution_breach_str={resolution_breach_str}
                resolution_breached={resolution_breached} />
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