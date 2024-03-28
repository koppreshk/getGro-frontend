import { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

interface FacebookResponse {
    name: string;
    picture: Picture;
    id: string;
    userID: string;
    expiresIn: number;
    accessToken: string;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
}

export interface Picture {
    data: Data;
}

export interface Data {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
}

export const FacebookConfigurations = () => {
    const [facebookResponse, setFacebookResponse] = useState<null | FacebookResponse>(null);
    const responseFacebook = (response: FacebookResponse) => {
        setFacebookResponse(response);
    }

    return (
        <div style={{ overflow: "auto", height: '100%' }}>
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
            <pre>
                {facebookResponse ? JSON.stringify(facebookResponse, null, 2) : null}
            </pre>
        </div>
    )
}