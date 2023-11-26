import React, { useState } from "react"
import { FlexBox } from "lib/ui-ux"
import { ModuleSubMenu } from "modules/core"
import { Navigate, Route, Routes } from "react-router-dom";
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { TextboxField } from "lib/form-fields";
import { FormProvider, useForm } from "react-hook-form";

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
    const [data, setData] = useState<ReactFacebookLoginInfo>();
    const formMethods = useForm({
        mode: 'onBlur',
        defaultValues: {
            facebookAppId: ''
        }
    });

    const { watch } = formMethods;

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        console.log(response);
        setData(response);
    }

    return (
        <FormProvider {...formMethods}>
            <FlexBox $gap="10px" $flexDirection="column">
                <TextboxField name="facebookAppId" label="Facebook App Id" />
                {watch('facebookAppId').length === 16 ?
                    <FacebookLogin
                        appId={watch('facebookAppId')}
                        fields="name,email,picture"
                        scope="openid"
                        callback={responseFacebook}
                        icon="fa-facebook" /> : null}
                {data?.picture?.data?.url ? <img src={data?.picture?.data?.url} height={data?.picture?.data?.height} width={data?.picture?.data?.width} /> : null}
            </FlexBox>
        </FormProvider>
    )
}