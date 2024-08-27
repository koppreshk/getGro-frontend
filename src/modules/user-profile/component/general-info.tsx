import { Grid, Typography } from "@mui/material"
import { TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"

export const GeneralInfo = () => {
    const formMethods = useForm();
    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" gap="10px" width="25%">
                <Typography variant="h5">Basic Info</Typography>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <TextboxField label="Name" name="full name" size="small" />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField label="Display Name" name="displayName" size="small" />
                    </Grid>
                </Grid>
            </FlexBox>
        </FormProvider >
    )
}