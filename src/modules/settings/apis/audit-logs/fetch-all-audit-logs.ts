import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { AuditLogEndPoint, AuditLogsQueryKey } from './apis';

export interface AuditLog {
  event_type: string;
  summary: string;
  created_at: string;
  user: string;
}

export interface IAuditLogsResponse {
  audit_logs: AuditLog[];
  total_pages: number;
}

export const useFetchAllAuditLogs = (
  itemsPerPage: string,
  pageNumber: string
) => {
  const { getData } = useServiceClient();

  const auditLogs = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${AuditLogEndPoint.AUDIT_LOGS}?page=${pageNumber}&items_per_page=${itemsPerPage}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, pageNumber, itemsPerPage]
  );

  return useQuery<IAuditLogsResponse, { message: string }>({
    queryFn: auditLogs,
    queryKey: [AuditLogsQueryKey.AUDIT_LOGS, pageNumber, itemsPerPage],
  });
};
