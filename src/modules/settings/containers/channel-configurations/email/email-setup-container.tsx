import { EmailConfigLayout, IEmailConfigFormFields } from "modules/settings/component/channel-configurations";
import { useSetupEmail } from "modules/settings/apis/channel-configurations/email";

export const EmailSetupContainer = () => {
    const { mutateAsync } = useSetupEmail();

    const onSubmit = (formData: IEmailConfigFormFields) => {
        mutateAsync({ email: formData.emailAddress }).then((res) => {
            window.open(res.auth_url);
        })
    }

    return <EmailConfigLayout onSubmit={onSubmit} />
}