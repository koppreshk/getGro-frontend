import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { DownloadForOfflineOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useNotifications } from 'lib';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { DateTime } from 'luxon';
import {
  ServiceStdReportValues,
  useDownloadServiceStdReport,
} from 'modules/dashboard/apis';
import { useState } from 'react';

import { DashboardDateRangePicker } from '../dashboard-date-range-picker';
import { ChartTypeToggle } from './chart-type-toggle';
import { ServiceStdReportChart } from './service-std-report-chart';
import { TopMetrics } from './top-metrics';

interface IServiceStandardReportProps {
  data: ServiceStdReportValues;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const ServiceStandardReport = (props: IServiceStandardReportProps) => {
  const { dateRange, setDateRange } = props;
  const { showNotification } = useNotifications();
  const [selectedChartType, setSelectedChartType] = useState<'pie' | 'bar'>(
    'pie'
  );

  const { mutateAsync, isLoading } = useDownloadServiceStdReport();

  const handleDownload = () => {
    const parsedFromDate = DateTime.fromISO(
      dateRange.startDate!.toISOString()
    ).toFormat('yyyy-MM-dd');
    const parsedToDate = DateTime.fromISO(
      dateRange.endDate!.toISOString()
    ).toFormat('yyyy-MM-dd');

    mutateAsync({
      from: parsedFromDate,
      to: parsedToDate,
    })
      .then((blob) => {
        // Step 1: Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Step 2: Create a temporary anchor element
        const link = document.createElement('a');
        link.href = url;

        // Step 3: Set the desired file name
        link.download = 'service_standard_report.csv';

        // Step 4: Append it to the document and trigger a click
        document.body.appendChild(link);
        link.click();

        // Step 5: Clean up
        link.remove();
        window.URL.revokeObjectURL(url);

        // Step 6: Notify success
        showNotification({
          message: 'Successfully downloaded CSV report',
          type: 'success',
        });
      })
      .catch(() => {
        // Handle download errors gracefully
        showNotification({
          message: 'Failed to download CSV report. Please try again later.',
          type: 'error',
        });
      });
  };

  return (
    <>
      <FlexBox
        flexDirection="column"
        gap="20px"
        height="100%"
        width="100%"
        padding="0px 25px"
      >
        <FlexBox justifyContent="flex-end" alignItems="center" gap={'20px'}>
          <DashboardDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <ChartTypeToggle
            value={selectedChartType}
            onChange={(val) => setSelectedChartType(val)}
          />
          <CustomIconButton
            iconComponent={
              isLoading ? (
                <CircularProgress size={16} thickness={5} />
              ) : (
                <DownloadForOfflineOutlined fontSize="small" />
              )
            }
            tooltipProps={{ title: 'Download' }}
            onClick={handleDownload}
          />
        </FlexBox>
        <TopMetrics metricsData={props.data} />
        {/* <FlexBox gap={'20px'} width="100%"> */}
        <ServiceStdReportChart
          data={props.data}
          selectedChartType={selectedChartType}
        />
        {/* </FlexBox> */}
      </FlexBox>
    </>
  );
};
