import { useFetchAllCannedResponses } from "modules/settings/apis/canned-response";
import { CannedResponseLayout } from "../../component/ticket-configurations/canned-response/canned-response-layout";
import { ErrorMessage } from "lib/ui-ux";

export const CannedResponseContainer = () => {
    const { data, isLoading, error } = useFetchAllCannedResponses();

    if (data || isLoading) {
        return (
            <CannedResponseLayout data={data} isLoading={isLoading} />
        )
    }
    return (
        <ErrorMessage statusCode={error?.message} />
    )
}