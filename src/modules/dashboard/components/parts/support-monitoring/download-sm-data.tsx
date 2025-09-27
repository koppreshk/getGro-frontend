import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { DownloadForOfflineOutlined } from '@mui/icons-material';
import { t } from 'i18next';
import { CustomIconButton } from 'lib/ui-ux';
import { saveAsCSV } from 'lib/utils';
import { SupportMonitoringValues } from 'modules/dashboard/apis';
import { DashboardQueryKeys } from 'modules/dashboard/apis/apis';
import { useQueryClient } from 'react-query';

interface DownloadSMDataProps {
  data: SupportMonitoringValues;
  dateRange: DateRange;
}

export const DownloadSMData = (props: DownloadSMDataProps) => {
  const { data, dateRange } = props;
  const queryClient = useQueryClient();

  const onDownloadBtnClick = async () => {
    await queryClient.refetchQueries([
      DashboardQueryKeys.FETCH_SM_TICKET_STATISTICS,
      dateRange,
    ]);
    const ticketStats = queryClient.getQueryData([
      DashboardQueryKeys.FETCH_SM_TICKET_STATISTICS,
      dateRange,
    ]);

    saveAsCSV([{ ...data, ...(ticketStats as {}) }], {
      fileName: 'support-monitoring-data.csv',
    });
  };

  return (
    <CustomIconButton
      iconComponent={<DownloadForOfflineOutlined fontSize="small" />}
      tooltipProps={{ title: t('download_as_csv') }}
      onClick={onDownloadBtnClick}
    />
  );
};
