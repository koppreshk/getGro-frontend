import { Typography, Button } from "@mui/material";
import { SwitchField, TextboxField } from "lib/form-fields";
import { FlexBox, GridLayout, HorizontalSeparator } from "lib/ui-ux";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IAddEmailConfigFormFields {
    emailAddress: string;
    displayName: string;
    isActive: boolean;
}

interface IAddEmailProps {
    formType?: 'ADD' | 'EDIT'
    onSubmit: (formData: IAddEmailConfigFormFields) => void;
}

export const AddEmail = (props: IAddEmailProps) => {
    const { formType = 'ADD', onSubmit } = props;
    const { handleSubmit } = useFormContext<IAddEmailConfigFormFields>();
    const navigate = useNavigate();

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} >
            <FlexBox flexDirection="column" gap='10px'>
                <Typography variant="h5">Email Configuration</Typography>
                <HorizontalSeparator />
            </FlexBox>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">Display Name</Typography>
                <FlexBox flexDirection="column" gap={'5px'}>
                    <TextboxField name="displayName" sx={{ width: '350px' }} size="small" rules={{ required: 'Display name is required' }} />
                    <Typography variant="body3">Name specified here will be used as a display name for email sent through the portal.</Typography>
                </FlexBox>
            </GridLayout>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">Email Address</Typography>
                <TextboxField name="emailAddress" disabled={formType === 'EDIT'} type="email" sx={{ width: '350px' }} size="small" rules={{ required: 'Email address is required' }} />
            </GridLayout>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">Email Active</Typography>
                <SwitchField name="isActive" />
            </GridLayout>
            <HorizontalSeparator />
            <FlexBox gap={'50px'}>
                <Button variant="outlined" sx={{ width: '100px' }} onClick={() => navigate(-1)}>Cancel</Button>
                <Button variant="contained" sx={{ width: '150px' }} onClick={handleSubmit(onSubmit)}>{formType === 'ADD' ? 'Add' : 'EDIT'}</Button>
            </FlexBox>
        </FlexBox>
    )
}