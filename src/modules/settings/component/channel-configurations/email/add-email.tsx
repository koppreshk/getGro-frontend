import { Typography, Button } from "@mui/material";
import { SwitchField, TextboxField } from "lib/form-fields";
import { FlexBox, GridLayout, HorizontalSeparator } from "lib/ui-ux";
import { useForm, FormProvider } from "react-hook-form";

export interface IAddEmailConfigFormFields {
    emailAddress: string;
    displayName: string;
    isActive: boolean;
}

interface IAddEmailProps {
    onSubmit: (formData: IAddEmailConfigFormFields) => void;
}

export const AddEmail = (props: IAddEmailProps) => {
    const { onSubmit } = props;
    const form = useForm<IAddEmailConfigFormFields>({
        defaultValues: {
            displayName: '',
            emailAddress: '',
            isActive: true
        }
    });

    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" flexDirection="column" gap={'20px'} >
                <FlexBox flexDirection="column" gap='10px'>
                    <Typography variant="h5">Email Configuration</Typography>
                    <HorizontalSeparator />
                </FlexBox>
                <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                    <Typography variant="h6">Display Name</Typography>
                    <FlexBox flexDirection="column" gap={'5px'}>
                        <TextboxField name="displayName" sx={{ width: '350px' }} />
                        <Typography variant="body3">Name specified here will be used as a display name for email sent through the portal.</Typography>
                    </FlexBox>
                </GridLayout>
                <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                    <Typography variant="h6">Email Address</Typography>
                    <TextboxField name="emailAddress" type="email" sx={{ width: '350px' }} rules={{ required: 'Email field is required' }} />
                </GridLayout>
                <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                    <Typography variant="h6">Email Active</Typography>
                    <SwitchField name="isActive" />
                </GridLayout>
                <HorizontalSeparator />
                <Button variant="contained" sx={{ width: '350px', ml: '150px' }} onClick={form.handleSubmit(onSubmit)}>Submit</Button>
            </FlexBox>
        </FormProvider>
    )
}