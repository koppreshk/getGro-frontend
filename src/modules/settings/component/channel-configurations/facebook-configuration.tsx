import { FlexBox } from 'lib/ui-ux';
import FacebookLogin from 'react-facebook-login';

export const FacebookConfigurations = () => {
    const responseFacebook = (response) => {
        console.log(response);
    }

    return (
        <FlexBox width='100%' height='100%' padding='20px'>
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
        </FlexBox>
    )
}