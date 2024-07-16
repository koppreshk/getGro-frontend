import { Button, DialogActions, Grid } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { FormProvider, useForm } from "react-hook-form";

interface IAddExotelConfigurationFormProps {
    togglePopup: () => void;
}

export const AddExotelConfigurationForm = (props: IAddExotelConfigurationFormProps) => {
    const { togglePopup } = props;
    const form = useForm();

    return (
        <FormProvider {...form}>
            <form>
                {AddExotelConfigForm()}
            </form>
            <DialogActions>
                <Button onClick={togglePopup} variant="outlined">Cancel</Button>
                <Button onClick={togglePopup} variant="contained">Next</Button>
            </DialogActions>
        </FormProvider>
    )
}


// const steps = [
//     {
//         label: 'Account',
//         description: `Connect shopify store with getgro`,
//     },
//     {
//         label: 'Permissions',
//         description: 'Setup visibility to limit access to certain roles',
//     }
// ];

function AddExotelConfigForm() {
    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="email" label="Exotel Domain" size="small" type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="password" label="Exotel Account SID" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="password" label="Exotel API Key" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="password" label="Exotel API Token" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="password" label="BoldDesk API Key" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>

            <Grid item md={12}>
                <Button variant="contained">Verify Exotel Account</Button>
            </Grid>
        </Grid>
    )
}