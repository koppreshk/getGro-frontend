import { TicketTagsList } from "modules/settings/component/ticket-configurations";

export const TicketTagsContainer = () => {
    // const { data, isLoading, error } = useFetchTagsByChannel(props.channelId.toString());

    // if (isLoading) {
    //     return (
    //         <CenteredCircularProgress />
    //     )
    // }

    // if (data) {
    return (
        <TicketTagsList />
    )
    // }

    // return <span>Error: {error as string}</span>
}