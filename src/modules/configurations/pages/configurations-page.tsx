import React from "react"
import { FlexBox } from "lib/ui-ux"
import { ModuleSubMenu } from "modules/core"
import { Navigate, Route, Routes } from "react-router-dom";
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';

export const ConfigurationsPage = React.memo(() => {

    const subMenuOptions = [{
        name: 'facebook',
        primaryKey: 'facebook',
        route: 'facebook'
    }];

    return (
        <FlexBox $width="100%" $height="100%" >
            <ModuleSubMenu subMenuOptions={subMenuOptions} />
            <Routes>
                <Route key="default-view" path="*" element={<Navigate to="/configurations/facebook" />} />
                <Route key="facebbok" path="/facebook" element={<FacebookConfiguration />} />
            </Routes>
        </FlexBox>
    )
})

const FacebookConfiguration = () => {
    const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
        console.log(response);
    }

    return (
        <>
            <FacebookLogin
                appId="2310166352500559"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
        </>
    )
}