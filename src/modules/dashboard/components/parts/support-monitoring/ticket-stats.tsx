import { Typography } from "@mui/material"
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "lib/form-fields";
import { useFetchSupportMonitoringStatistics, useFetchSupportMonitoringTicketsCreated } from "modules/dashboard/apis";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { useTranslation } from "react-i18next";

const StyledContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    box-shadow: 0 4px 8px -2px #1018281a,0 2px 4px -2px #18212f0f;
`;

export const TicketStats = (props: { dateRange: DateRange }) => {
    // const [filterValue, setFilters] = useState('today');
    const { data, isLoading } = useFetchSupportMonitoringStatistics(props.dateRange);
    const { t } = useTranslation();

    const quickStats1 = [{
        name: t('tickets_created'),
        value: data?.tickets_created || 0,
    }, {
        name: 'Replies By Agent',
        value: data?.replies_by_agents || 0
    }, {
        name: 'Response Pending',
        value: data?.response_pending || 0
    }];

    const quickStats2 = [{
        name: 'Tickets Closed',
        value: data?.tickets_closed || 0
    }, {
        name: 'Replies By Customers',
        value: data?.replies_by_customers || 0
    }, {
        name: 'Resolution Pending',
        value: data?.resolution_pending || 0
    }]

    // const onFilterChangeHandler = useCallback((value: string) => {
    //     setFilters(value);
    // }, []);

    const { pallete } = useTheme();
    // const dateFilters = [{ label: 'Today', key: 'today' }, { label: 'Yesterday', key: 'yesterday' }, { label: 'Last 7 Days', key: 'last_7_days' }, { label: 'Last 30 Days', key: 'last_30_days' }, { label: 'Last 90 Days', key: 'last_90_days' }]

    return (
        <>
            <StyledContainer padding="20px" flexDirection="column" gap="20px" width="calc(70% - 20px)">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Ticket Statistics</Typography>
                    {/* <DateFilters onFilterChangeHandler={onFilterChangeHandler} filterValue={filterValue} dateFilterTypes={dateFilters} /> */}
                </FlexBox>
                <FlexBox width="100%" style={{ minHeight: '340px' }}>
                    <FlexBox gap="20px" width="45%" style={{ borderRight: `1px solid ${pallete.grayVariant1}` }}>
                        {isLoading
                            ? <CenteredCircularProgress />
                            :
                            <>
                                <FlexBox flexDirection="column" gap="60px" width="50%">
                                    {quickStats1.map((item) => <QuickStats key={item.name} item={item} />)}
                                </FlexBox>
                                <FlexBox flexDirection="column" gap="60px" width="50%">
                                    {quickStats2.map((item) => <QuickStats key={item.name} item={item} />)}
                                </FlexBox>
                            </>}
                    </FlexBox>
                    <TicketsCreated dateRange={props.dateRange} />
                </FlexBox>
            </StyledContainer>
        </>
    )
}

const QuickStats = (props: {
    item: {
        name: string;
        value: number;
        renderSeparator?: boolean
    }
}) => {
    const { name, value } = props.item;
    const { dashboard, pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="10px" style={{ borderLeft: `3px solid ${dashboard.graphBgColor1}`, paddingLeft: '15px' }}>
            <Typography sx={{ color: pallete.grayVariant3 }} variant="h6">{name}</Typography>
            <Typography variant="h3">{value}</Typography>
        </FlexBox>
    )
}

const TicketsCreated = (props: { dateRange: DateRange }) => {
    const form = useForm({
        defaultValues: {
            groupBy: 'status'
        }
    });
    const { data: apidata, isLoading } = useFetchSupportMonitoringTicketsCreated(form.watch('groupBy'), props.dateRange)

    const data = {
        series: [{
            data: Object.values(apidata || [])
        }],
        options: {
            chart: {
                fontFamily: 'Poppins',
                id: 'apexchart-example'
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: Object.keys(apidata || {})
            }
        } as ApexOptions
    };

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" width="55%" padding="0px 0px 0px 40px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6">Tickets Created</Typography>
                    <SelectField menuOptions={[{ key: 'status', value: 'Status' }, { key: 'priority', value: 'Priority' }, { key: 'source', value: 'Source' }]} name="groupBy" label="Group By" size="small" sx={{ width: '200px' }} />
                </FlexBox>
                {isLoading ? <CenteredCircularProgress /> : <ReactApexChart options={data.options} series={data.series} type="bar" height={285} width={'100%'} />}
            </FlexBox>
        </FormProvider>
    )
}