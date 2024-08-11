
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TextboxFieldWithLabel } from "lib/form-fields";

interface ICreateTagProps {
    open: boolean
    handleClose: () => void;
}

export const CreateTag = (props: ICreateTagProps) => {
    const { open, handleClose } = props;
    const form = useForm<{ createTagName: string }>({
        shouldUnregister: true,
        defaultValues: {
            createTagName: ''
        }
    });

    const onCreateTagSubmit = (formValues: { createTagName: string }) => {
        console.log(formValues);
        handleClose();
    }

    return (
        <FormProvider {...form}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5">Create Tag</Typography>
                </DialogTitle>
                <DialogContent >
                    <TextboxFieldWithLabel
                        label="Tag Name" name="createTagName" id="outlined-basic" size="small" autoFocus rules={{ required: 'This field is required' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                    <Button autoFocus variant="contained" onClick={form.handleSubmit(onCreateTagSubmit)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}