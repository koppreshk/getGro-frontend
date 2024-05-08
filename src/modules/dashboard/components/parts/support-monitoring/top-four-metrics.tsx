import styled, { useTheme } from "styled-components";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { getFormatedNumberByLocale } from "lib/utils";
import { ISupportMonitor } from "./support-monitoring";

const Metric = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    padding: 20px;
    width: 100%;
`;

interface ITopMetricProps {
    name: string;
    value: number;
}

export const TopFourMetrics = (props: ISupportMonitor) => {
    const { hold_tickets, pending_tickets, resolution_overdue, response_overdue } = props;
    const data = [{
        name: 'Pending TIckets',
        value: pending_tickets,
    },
    {
        name: 'Hold TIckets',
        value: hold_tickets,
    },
    {
        name: 'Response Overdue',
        value: response_overdue,
    },
    {
        name: 'Resolution Overdue',
        value: resolution_overdue,
    }] as ITopMetricProps[];

    return (
        <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(4, 1fr)'}>
            {data.map((item, idx) => (
                <TopMetric item={item} key={idx} />
            ))}
        </GridLayout>
    )
}

const TopMetric = (props: { item: ITopMetricProps }) => {
    const { name, value } = props.item;
    const { pallete } = useTheme();

    return (
        <Metric flexDirection="column" gap="10px" alignItems="center">
            <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">{name}</Typography>
            <FlexBox gap="20px" alignItems="center">
                <Typography variant="h2">{getFormatedNumberByLocale(value)}</Typography>
            </FlexBox>
        </Metric>
    )
}
