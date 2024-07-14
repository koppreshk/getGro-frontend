import { useNotifications } from "lib"
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux"
import { useEditEmailConfig, useFetchAllEmails } from "modules/settings/apis"
import { AddEmail, IAddEmailConfigFormFields } from "modules/settings/component/channel-configurations"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"

export const EditEmailConfigContainer = () => {
    const [searchParams] = useSearchParams();
    const { mutateAsync } = useEditEmailConfig();
    const { showNotification } = useNotifications();
    const { data, isLoading, error } = useFetchAllEmails();
    const navigate = useNavigate();

    const onSubmit = (formData: IAddEmailConfigFormFields) => {
        mutateAsync({ displayName: formData.displayName, id: Number(searchParams.get('id')!), isActive: formData.isActive })
            .then(() => {
                showNotification({ message: 'Successfully edited email config', type: 'success' });
                navigate(-1);
            })
            .catch(() => showNotification({ message: 'Failed to update email config', type: 'error' }))
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        const emailConfigById = data.find((item) => item.id === Number(searchParams.get('id')!))
        const defaultValues = {
            displayName: emailConfigById?.name ?? '',
            emailAddress: emailConfigById?.email ?? '',
            isActive: emailConfigById?.can_create_ticket ?? false
        }

        return (
            <EditEmailForm defaultValues={defaultValues} onSubmit={onSubmit} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}

interface IEditEmailFormProps {
    defaultValues: IAddEmailConfigFormFields;
    onSubmit: (formData: IAddEmailConfigFormFields) => void
}

const EditEmailForm = (props: IEditEmailFormProps) => {
    const form = useForm({
        defaultValues: props.defaultValues
    });

    return (
        <FormProvider {...form}>
            <AddEmail onSubmit={props.onSubmit} />
        </FormProvider>
    )
}