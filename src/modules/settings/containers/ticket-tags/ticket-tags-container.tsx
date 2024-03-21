import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchTagsByChannel } from "modules/settings/apis/tags";
import { TicketTags } from "modules/settings/component/ticket-configurations";

export const TicketTagsContainer = (props: { value: number }) => {
    const { data, isLoading, error } = useFetchTagsByChannel(props.value.toString());

    if (isLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (data) {
        return (
            <TicketTags data={data} />
        )
    }

    return <span>Error: {error as string}</span>
}