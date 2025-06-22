import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { DashboardEndPoint } from './api-enums';

export interface IDownloadServiceStdReportArgs {
  from: string;
  to: string;
}

export const useDownloadServiceStdReport = () => {
  const { postData } = useServiceClient();

  const downloadServiceStdReportData = React.useCallback(
    async (args: IDownloadServiceStdReportArgs) => {
      const response = await postData(
        DashboardEndPoint.DOWNLOAD_STANDARD_REPORT,
        args
      );
      const contentType = response.headers.get('Content-Type');

      if (contentType?.includes('text/csv')) {
        return response.blob();
      }

      throw new Error('Unexpected content type');
    },
    [postData]
  );

  return useMutation({
    mutationKey: DashboardEndPoint.DOWNLOAD_STANDARD_REPORT,
    mutationFn: downloadServiceStdReportData,
  });
};
