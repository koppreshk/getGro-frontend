import { FlexBox, GridLayout } from "lib/ui-ux"
import styled, { useTheme } from "styled-components";
import { FirstContactResolution } from "./first-contact-resolution";
import { Typography } from "@mui/material";

interface ISingleStatProps {
    value: string;
    subHeading: string;
}

const data = [{
    value: "0 (0 avg per day)",
    subHeading: "Tickets Assigned"
}, {
    value: "0 (0 avg per day)",
    subHeading: "Tickets Resolved"
}, {
    value: "4",
    subHeading: "Tickets Closed"
}, {
    value: "6",
    subHeading: "Tickets Resssigned"
}]

const data1 = [{
    value: "0 (0 avg per day)",
    subHeading: "Public Reply Added"
}, {
    value: "0",
    subHeading: "Notes Added"
}, {
    value: "4",
    subHeading: "Replied Tickets"
}];

const data2 = [{
    value: "55sec",
    subHeading: "Avg First Response Time"
}, {
    value: "2min(s)",
    subHeading: "Avg Response Time"
}, {
    value: "4min(s)",
    subHeading: "Avg Resolution Time"
}];

const StyledLayout = styled(GridLayout)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    .single-stat-container:last-child {
        border-right: none;
    }
    .single-stat-container:first-child {
        padding: 0;
    }
`;

export const AgentTicketStats = () => {
    return (
        <>
            <StyledLayout $gridTemplateColumns="repeat(4, 1fr)" $padding="20px">
                {data.map((item) => <SingleStat subHeading={item.subHeading} value={item.value} key={item.subHeading} />)}
            </StyledLayout>
            <GridLayout $gridTemplateColumns="3fr 1fr" $gridGap="20px">
                <FlexBox flexDirection="column">
                    <StyledLayout $gridTemplateColumns="repeat(3, 1fr)" $padding="20px">
                        {data1.map((item) => <SingleStat subHeading={item.subHeading} value={item.value} key={item.subHeading} />)}
                    </StyledLayout>
                    <StyledLayout $gridTemplateColumns="repeat(3, 1fr)" $padding="20px">
                        {data2.map((item) => <SingleStat subHeading={item.subHeading} value={item.value} key={item.subHeading} />)}
                    </StyledLayout>
                </FlexBox>
                <FirstContactResolution />
            </GridLayout>
        </>
    )
}

const SingleStatContainer = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    padding-left: 30px;
`;

const SingleStat = (props: ISingleStatProps) => {
    const { value, subHeading } = props;
    const { pallete } = useTheme();
    return (
        <SingleStatContainer flexDirection="column" gap="15px" className="single-stat-container">
            <Typography variant="h4">{value}</Typography>
            <Typography sx={{ color: pallete.grayNeutral }} variant="body2">{subHeading}</Typography>
        </SingleStatContainer>
    )
}