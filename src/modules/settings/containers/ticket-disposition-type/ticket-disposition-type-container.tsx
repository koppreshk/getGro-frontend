import { useFetchAllDisposition } from "modules/settings/apis/disposition-types"
import { TicketDispositionTypeLayout } from "modules/settings/component/ticket-configurations";

export const TicketDispositionTypeContainer = () => {
    const { data, error, isLoading } = useFetchAllDisposition();
    
    if (data || isLoading) {
        return (
            <TicketDispositionTypeLayout data={data} isLoading={isLoading} />
        )
    }
    return<span>Error: {error as string}</span>
}