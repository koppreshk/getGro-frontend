import { ErrorMessage } from "lib/ui-ux";
import { AutoMationType, useFetchAllAssignments } from "modules/settings/apis/ticket-automation";
import { CreateTicketTriggersLayout } from "modules/settings/component/ticket-automation/create-ticket-triggers";
import { UpdateTicketTriggersLayout } from "modules/settings/component/ticket-automation/update-ticket-triggers";

export const FetchAllCreateTicketTriggersContainer = (props: {
    autoMationType: AutoMationType;
}) => {
    const { data, isError, error, isLoading } = useFetchAllAssignments(props.autoMationType);

    if (isError) return <ErrorMessage statusCode={error?.message} />

    return (
        <>
            {
                props.autoMationType === 'create_trigger'
                    ? <CreateTicketTriggersLayout data={data} isLoading={isLoading} autoMationType={props.autoMationType} />
                    : <UpdateTicketTriggersLayout data={data} isLoading={isLoading} autoMationType={props.autoMationType} />
            }
        </>
    )
}