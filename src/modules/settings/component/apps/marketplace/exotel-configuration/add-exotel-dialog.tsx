import styled from "styled-components";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { TextboxField } from "lib/form-fields";
import { FormProvider, useForm } from "react-hook-form";

interface IAddExotelDialogProps {
    togglePopup: () => void;
    openPopup: boolean
}

const StyledDialogActions = styled(DialogActions)`
    && {
        padding: 8px 22px 22px;
    }
`;

export const AddExotelDialog = (props: IAddExotelDialogProps) => {
    const { openPopup, togglePopup } = props;
    const form = useForm();

    return (
        <Dialog open={openPopup} onClose={togglePopup}>
            <DialogTitle sx={{ fontSize: '16px' }}>
                Exotel Configuration
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={togglePopup}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
            <FormProvider {...form}>
                <DialogContent>
                    <form>
                        {AddExotelConfigForm()}
                    </form>
                </DialogContent>
            </FormProvider>
            <StyledDialogActions>
                <Button onClick={togglePopup} variant="outlined">Cancel</Button>
                <Button onClick={togglePopup} variant="contained">Next</Button>
            </StyledDialogActions>
        </Dialog>
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