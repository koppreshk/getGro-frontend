import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchTagsByChannel } from "modules/settings/apis/tags";
import { TicketTags } from "modules/settings/component/ticket-configurations";

export const TicketTagsContainer = (props: { channelId: number }) => {
    const { data, isLoading, error } = useFetchTagsByChannel(props.channelId.toString());

    if (isLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (data) {
        return (
            <TicketTags data={data} channelId={props.channelId} />
        )
    }

    return <span>Error: {error as string}</span>
}