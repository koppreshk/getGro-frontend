import { useSearchParams } from "react-router-dom";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchEscalationById } from "modules/settings/apis/escalations";

export const EditEscalationsContainerNew = () => {
    const [searchParams] = useSearchParams();
    const { data, isLoading, error } = useFetchEscalationById(Number(searchParams.get('id')!));

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <p>edit esclation form here</p>
        )
    }
    return <ErrorMessage statusCode={error?.message} />
}