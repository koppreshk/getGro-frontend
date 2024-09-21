import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllTags } from "modules/settings/apis/tags";
import { TagsLayout } from "modules/settings/component/ticket-configurations";

export default function TicketTagsContainer() {
    const { data, isLoading, error, isFetching } = useFetchAllTags();

    if (data || isLoading) {
        return (
            <TagsLayout data={data} isLoading={isLoading || isFetching} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}