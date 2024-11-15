import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchAllTags } from "modules/settings/apis/tags";
import { useFetchPriorities } from "modules/tickets/apis";
import { CreateLinkDrawerContent, CreateLinkFormFields } from "../components/chat-details/create-link-drawer-content"

export const CreateAndLinkTicketContainer = (props: { toggleAddTicketDrawer: () => void }) => {
    const { toggleAddTicketDrawer } = props;
    const { data: priorities, isLoading: prioritiesLoading, error } = useFetchPriorities();
    const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();

    const onSubmit = (formdata: CreateLinkFormFields) => {
        console.log(formdata);
    }

    if (tagsLoading || prioritiesLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (priorities && allTags) {
        return (
            <>
                <CreateLinkDrawerContent
                    priorities={priorities} allTags={allTags}
                    mutationLoading={false} toggleAddTicketDrawer={toggleAddTicketDrawer}
                    onSubmit={onSubmit} />
            </>
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}