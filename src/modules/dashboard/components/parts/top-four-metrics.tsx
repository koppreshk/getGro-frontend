import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux"
import { useMemo } from "react";
import styled, { useTheme } from "styled-components"

const Metric = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

const data = [{
    name: 'Tickets resolved out of ' + new Intl.NumberFormat("en-IN").format(124800),
    value: 84568,
    total: 124800,
    color: 'secondary'
},
{
    name: 'Tickets disposed out of ' + new Intl.NumberFormat("en-IN").format(113510),
    value: 55879,
    total: 113510,
    color: 'primary'
},
{
    name: 'Tickets disposed as resolved out of ' + new Intl.NumberFormat("en-IN").format(113510),
    value: 71565,
    total: 113510,
    color: 'success'
},
{
    name: 'Tickets disposed as pending out of ' + new Intl.NumberFormat("en-IN").format(113510),
    value: 19008,
    total: 113510,
    color: 'info'
}] as ITopMetricProps[]

interface ITopMetricProps extends Pick<LinearProgressProps, 'color'> {
    name: string;
    value: number;
    total: number;
}

export const TopFourMetrics = () => {

    return (
        <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(4, 1fr)'}>
            {data.map((item, idx) => (
                <TopMetric item={item} key={idx} />
            ))}
        </GridLayout>
    )
}

const TopMetric = (props: { item: ITopMetricProps }) => {
    const { name, total, value, color } = props.item;
    const { pallete } = useTheme();

    const progress = useMemo(() => {
        return (value / total) * 100;
    }, [total, value]);

    return (
        <Metric flexDirection="column" gap="10px">
            <Typography variant="h3">{new Intl.NumberFormat("en-IN").format(value)}</Typography>
            <Typography sx={{ color: pallete.grayVariant2 }} variant="subheading2">{name}</Typography>
            <FlexBox width="100%" gap="10px" alignItems="center">
                <LinearProgress sx={{ width: 'calc(100% - 38px)' }} color={color} variant="determinate" value={progress} />
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    progress,
                )}%`}</Typography>
            </FlexBox>
        </Metric>
    )
}