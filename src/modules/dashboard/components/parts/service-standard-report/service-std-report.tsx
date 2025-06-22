import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { DownloadForOfflineOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useNotifications } from 'lib';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import {
  ServiceStdReportValues,
  useDownloadServiceStdReport,
} from 'modules/dashboard/apis';

import { DashboardDateRangePicker } from '../dashboard-date-range-picker';
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

  const { mutateAsync, isLoading } = useDownloadServiceStdReport();

  const handleDownload = () => {
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

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
        <ServiceStdReportChart data={props.data} />
        {/* </FlexBox> */}
      </FlexBox>
    </>
  );
};
