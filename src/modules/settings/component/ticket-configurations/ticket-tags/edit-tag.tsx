
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Avatar } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { FormProvider, useForm } from "react-hook-form";
import { TextboxField } from "lib/form-fields";
import { useEditTag } from "modules/settings/apis/tags";
import { useNotifications } from "lib";
import { Edit } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useState, useCallback } from "react";

interface IEditTagProps {
    open: boolean
    clickedTagDetails: { name: string, id: number }
    handleClose: () => void;
}

const EditTagDialog = (props: IEditTagProps) => {
    const { open, handleClose, clickedTagDetails } = props;
    const form = useForm<{ editTagName: string }>({
        shouldUnregister: true,
        defaultValues: {
            editTagName: ''
        }
    });

    const { mutateAsync } = useEditTag();
    const { showNotification } = useNotifications();

    const onEditTagSubmit = (formValues: { editTagName: string }) => {
        mutateAsync({
            id: clickedTagDetails.id.toString(),
            name: formValues.editTagName
        }).then(() => showNotification({ message: 'Successfully edited the tag' }))
            .catch(() => showNotification({ message: 'Failed to edit the tag', type: 'error' }))
            .finally(() => handleClose());
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
                    Edit Tag
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Chip
                        label={clickedTagDetails.name}
                        sx={{ textDecoration: 'line-through' }}
                        size="medium"
                        avatar={<Avatar>{clickedTagDetails.name[0]?.toLocaleUpperCase()}</Avatar>} />
                    <ArrowRightAltIcon />
                    <TextboxField name="editTagName" id="outlined-basic" variant="standard" size="small" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button autoFocus variant="contained" onClick={form.handleSubmit(onEditTagSubmit)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}

export const EditTag = (props: { id: number; name: string }) => {
    const [isDialogShown, setDialogDisplay] = useState(false);

    const toggleDrawer = useCallback(() => {
        setDialogDisplay((preValue) => !preValue);
    }, []);

    return (
        <>
            <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit tag", arrow: true }} onClick={toggleDrawer} />
            <EditTagDialog handleClose={toggleDrawer} open={isDialogShown} clickedTagDetails={props} />
        </>
    )
}