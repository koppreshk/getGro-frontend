
import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllTemplates } from "modules/settings/apis/templates";
import { TemplatesLayout } from "modules/settings/component/ticket-configurations/templates/templates-layout";

export default function TemplatesContainer() {
    const { data, isLoading, error } = useFetchAllTemplates();

    if (data || isLoading) {
        return (
            <TemplatesLayout data={data} isLoading={isLoading} />
        )
    }
    return (
        <ErrorMessage statusCode={error?.message} />
    )
}