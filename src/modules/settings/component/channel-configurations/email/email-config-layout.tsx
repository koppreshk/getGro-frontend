import { Button, Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form"

export interface IEmailConfigFormFields {
    emailAddress: string;
    displayName: string;
}

interface IEmailConfigLayoutProps {
    onSubmit: (formData: IEmailConfigFormFields) => void;
}

export const EmailConfigLayout = (props: IEmailConfigLayoutProps) => {
    const { onSubmit } = props;
    const form = useForm<IEmailConfigFormFields>();
    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" flexDirection="column" gap={'20px'} >
                <Typography variant="h5">Email Configuration</Typography>
                <FlexBox gap={'50px'} alignItems="center">
                    <Typography variant="h6">Display Name</Typography>
                    <FlexBox flexDirection="column" gap={'5px'}>
                        <TextboxField name="displayName" sx={{ width: '350px' }} />
                        <Typography variant="body3">Name specified here will be used as a display name for email sent through the portal.</Typography>
                    </FlexBox>
                </FlexBox>
                <FlexBox gap={'50px'} alignItems="center">
                    <Typography variant="h6">Email Address</Typography>
                    <TextboxField name="emailAddress" type="email" width='350px' rules={{ required: 'Email field is required' }} />
                </FlexBox>
                <HorizontalSeparator />
                <Button variant="contained" sx={{ width: '350px', ml: '150px' }} onClick={form.handleSubmit(onSubmit)}>Submit</Button>
            </FlexBox>
        </FormProvider>
    )
}