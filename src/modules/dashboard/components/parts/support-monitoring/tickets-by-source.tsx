import { Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FlexBox, MoreInformation } from 'lib/ui-ux';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

const ChartContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const getChartMetadata = (channelsInfo: { [key: string]: number }) => {
    return {
        series: Object.values(channelsInfo),
        options: {
            chart: {
                fontFamily: 'Poppins',
                width: 400,
                height: 480,
                type: 'pie',
            },
            labels: Object.keys(channelsInfo),
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 400
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            // colors: [theme.graphBgColor2, theme.graphBgColor3, theme.graphBgColor4, theme.graphBgColor5, theme.graphBgColor6, theme.graphBgColor7],
        } as ApexOptions,
    }
}

export const TicketsBySource = (props: { channelsInfo: { [key: string]: number } }) => {
    const { channelsInfo } = props;
    const chartMetadata = getChartMetadata(channelsInfo);
    const dataDoesNotExists = Object.values(channelsInfo).every((item) => item === 0);
    const {t} = useTranslation();
    return (
        <>
            <ChartContainer flexDirection="column" justifyContent='space-between' width='30%'>
                <Typography variant='h5'>{t('channel_contribution')}</Typography>
                <FlexBox alignItems='center' justifyContent='center' height='100%'>
                    {dataDoesNotExists
                        ? <MoreInformation information='No results found' />
                        : <Chart options={chartMetadata.options} series={chartMetadata.series} type="pie" width={380} />}
                </FlexBox>
            </ChartContainer>
        </>
    )
}