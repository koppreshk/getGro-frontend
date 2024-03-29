import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllChannels } from "modules/settings/apis/tags";
import { TagsChannelLayout } from "modules/settings/component/ticket-configurations";

export const FetchAllTagsContainer = () => {
    const { data, isLoading, error } = useFetchAllChannels();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <TagsChannelLayout channels={data!} />
            </>
        )
    }

    return <span>Error: {error as any}</span>

}