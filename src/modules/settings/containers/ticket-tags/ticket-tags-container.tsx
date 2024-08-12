import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllTags } from "modules/settings/apis/tags";
import { TagsList } from "modules/settings/component/ticket-configurations";

export const TicketTagsContainer = () => {
    const { data, isLoading, error } = useFetchAllTags();

    if (data || isLoading) {
        return (
            <TagsList data={data} isLoading={isLoading} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}