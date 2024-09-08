import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllAuditLogs } from "modules/settings/apis/audit-logs/fetch-all-audit-logs";
import { AuditLogsLayout } from "modules/settings/component/general/audit-logs";
import { useSearchParams } from "react-router-dom";

export default function AuditLogsContainer() {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords') ?? '10';
    const pageNumber = searchParams.get('pageNumber') ?? '1';

    console.log('AuditLogsContainer re-rendered', searchParams.get('noOfRecords'), searchParams.get('pageNumber'));


    const { data, error, isLoading } = useFetchAllAuditLogs(itemsPerPage, pageNumber);

    if (data || isLoading) {
        return <AuditLogsLayout data={data || { audit_logs: [], total_pages: 0 }} isLoading={isLoading} />
    }

    return <ErrorMessage statusCode={error?.message} />
}