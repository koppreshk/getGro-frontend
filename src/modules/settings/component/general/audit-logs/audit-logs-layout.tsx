import { ArrowBack } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux"
import { useNavigate } from "react-router-dom";
import { AuditLogList } from "./audit-log-list";
import { IAuditLogsResponse } from "modules/settings/apis/audit-logs/fetch-all-audit-logs";
import { AuditLogFilter } from "./audit-log-filter";

interface IAuditLogsLayoutProps {
    data: IAuditLogsResponse;
    isLoading: boolean;
}

export const AuditLogsLayout = (props: IAuditLogsLayoutProps) => {
    const { data, isLoading } = props;
    const navigate = useNavigate();

    return (
        <FlexBox width="100%" flexDirection="column" height="100%">
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap={'20px'} padding="20px" height="calc(100% - 46px)">
                <MoreInformation information="Activity logs provide information about specific events or operations, like what the change was and who made it" />
                <FlexBox width="100%" padding="10px" justifyContent="space-between">
                    <FlexBox alignItems="center" gap="10px">
                        <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                        <Typography variant="h5">Audit Logs</Typography>
                    </FlexBox>
                    <AuditLogFilter />
                </FlexBox>
                <AuditLogList data={data.audit_logs} isLoading={isLoading} totalPages={data.total_pages} />
            </FlexBox>
        </FlexBox>
    )
}