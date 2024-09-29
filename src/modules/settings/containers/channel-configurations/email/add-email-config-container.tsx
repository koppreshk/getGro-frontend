import { AddEmail, IAddEmailConfigFormFields } from "modules/settings/component/channel-configurations";
import { useNylasOAuth, useSetupEmail } from "modules/settings/apis/channel-configurations/email";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNotifications } from "lib";
import { useForm, FormProvider } from "react-hook-form";

export const AddEmailConfigContainer = () => {
    const { mutateAsync, isLoading: mutationLoading } = useSetupEmail();
    const { mutateAsync: connectToNylasOAuth } = useNylasOAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { showNotification } = useNotifications();
    const navigate = useNavigate();

    const form = useForm<IAddEmailConfigFormFields>({
        defaultValues: {
            displayName: '',
            emailAddress: '',
            isActive: true
        }
    });

    useEffect(() => {
        if (code) {
            const { displayName, isActive } = form.getValues();
            connectToNylasOAuth({ code, displayName, isActive })
                .then(() => {
                    searchParams.delete('code');
                    setSearchParams(searchParams);
                    showNotification({ message: 'Successfully integrated email configuration', type: 'success' });
                    navigate(-1);
                })
                .catch(() => showNotification({ message: 'Successfully integrated email configuration', type: 'error' }))
        }
    }, [code, connectToNylasOAuth, form, navigate, searchParams, setSearchParams, showNotification]);

    const onSubmit = (formData: IAddEmailConfigFormFields) => {
        mutateAsync({ email: formData.emailAddress }).then((res) => {
            window.open(res.auth_url, "_self");
        })
    }

    return (
        <FormProvider {...form}>
            <AddEmail onSubmit={onSubmit} mutationLoading={mutationLoading} />
        </FormProvider>
    )
}