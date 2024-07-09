import { Button, Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form"

export const EmailConfigLayout = () => {
    const form = useForm();
    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
                <Typography variant="h5">Email Configuration</Typography>
                <FlexBox gap={'50px'} alignItems="center">
                    <Typography variant="h6">Display Name</Typography>
                    <FlexBox flexDirection="column">
                        <TextboxField name="displayName" />
                        <Typography variant="body3">Name specified here will be used as a display name for email sent through the portal.</Typography>
                    </FlexBox>
                </FlexBox>
                <FlexBox gap={'50px'} alignItems="center">
                    <Typography variant="h6">Email Address</Typography>
                    <TextboxField name="emailAddress" type="email" />
                </FlexBox>
                <Button variant="contained">Submit</Button>
            </FlexBox>
        </FormProvider>
    )
}