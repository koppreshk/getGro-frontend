import { EmailConfigLayout, IEmailConfigFormFields } from "modules/settings/component/channel-configurations";
import { useNylasOAuth, useSetupEmail } from "modules/settings/apis/channel-configurations/email";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNotifications } from "lib";

export const EmailSetupContainer = () => {
    const { mutateAsync } = useSetupEmail();
    const { mutateAsync: connectToNylasOAuth } = useNylasOAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { showNotification } = useNotifications();

    useEffect(() => {
        if (code) {
            connectToNylasOAuth({ code })
                .then(() => {
                    searchParams.delete('code');
                    setSearchParams(searchParams);
                    showNotification({ message: 'Successfully integrated email configuration', type: 'success' })
                })
                .catch(() => showNotification({ message: 'Successfully integrated email configuration', type: 'error' }))
        }
    }, [code, connectToNylasOAuth, searchParams, setSearchParams, showNotification]);

    const onSubmit = (formData: IEmailConfigFormFields) => {
        mutateAsync({ email: formData.emailAddress }).then((res) => {
            window.open(res.auth_url, "_self");
        })
    }

    return <EmailConfigLayout onSubmit={onSubmit} />
}