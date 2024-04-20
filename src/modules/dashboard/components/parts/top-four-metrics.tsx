import { LinearProgressProps, Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux"
import { getFormatedNumberByLocale } from "lib/utils";
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
    name: 'Created TIckets',
    value: 104568,
    total: 124800,
    color: 'success'
},
{
    name: 'Pending TIckets',
    value: 55879,
    total: 113510,
    color: 'primary'
},
{
    name: 'Disposed Tickets',
    value: 71565,
    total: 113510,
    color: 'secondary'
},
{
    name: 'FCR (First Contact Resolution)',
    value: 19008,
    total: 113510,
    color: 'info'
},
{
    name: 'Reopened Tickets',
    value: 1008,
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
        <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(5, 1fr)'}>
            {data.map((item, idx) => (
                <TopMetric item={item} key={idx} />
            ))}
        </GridLayout>
    )
}

const TopMetric = (props: { item: ITopMetricProps }) => {
    const { name, value } = props.item;
    const { pallete } = useTheme();

    // const progress = useMemo(() => {
    //     return (value / total) * 100;
    // }, [total, value]);

    return (
        <Metric flexDirection="column" gap="10px" alignItems="center">
            <Typography variant="h2">{getFormatedNumberByLocale(value)}</Typography>
            <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">{name}</Typography>
            {/* <FlexBox width="100%" gap="10px" alignItems="center">
                <LinearProgress sx={{ width: 'calc(100% - 38px)' }} color={color} variant="determinate" value={progress} />
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    progress,
                )}%`}</Typography>
            </FlexBox> */}
        </Metric>
    )
}
