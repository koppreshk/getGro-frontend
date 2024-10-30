import { ErrorMessage } from "lib/ui-ux"
import { useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { AutoAssignmentsLayout } from "modules/settings/component/ticket-automation";

export default function FetchAllAssignmentsContainer() {
    const { data, isError, error, isLoading, isFetching } = useFetchAllAssignments("auto_assignment");

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AutoAssignmentsLayout isLoading={isLoading || isFetching} data={data} />
        </>
    )
}