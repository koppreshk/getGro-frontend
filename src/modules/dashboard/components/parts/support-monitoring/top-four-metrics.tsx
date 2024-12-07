import styled, { useTheme } from "styled-components";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { getFormatedNumberByLocale } from "lib/utils";
import { SupportMonitoringValues } from "modules/dashboard/apis";
import { useTranslation } from "react-i18next";

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

export const TopFourMetrics = (props: Pick<SupportMonitoringValues, 'total_tickets' | 'pending_tickets' | 'resolution_overdue' | 'response_overdue'>) => {
    const { total_tickets, pending_tickets, resolution_overdue, response_overdue } = props;
    const { t } = useTranslation();
    const data = [{
        name: t('total_tickets'),
        value: total_tickets,
    },
    {
        name: t('pending_tickets'),
        value: pending_tickets,
    },
    {
        name: t('response_overdue'),
        value: response_overdue,
    },
    {
        name: t('resolution_overdue'),
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
