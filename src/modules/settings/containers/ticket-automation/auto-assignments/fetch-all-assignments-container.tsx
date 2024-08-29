import { ErrorMessage } from "lib/ui-ux"
import { useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { AutoAssignmentsLayout } from "modules/settings/component/ticket-automation";

export const FetchAllAssignmentsContainer = () => {
    const { data, isError, error, isLoading } = useFetchAllAssignments("auto_assignment");

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            <AutoAssignmentsLayout isLoading={isLoading} data={data} />
        </>
    )
}