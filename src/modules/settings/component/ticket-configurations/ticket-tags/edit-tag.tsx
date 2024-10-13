
import { Dialog, DialogTitle, DialogContent, DialogActions, Chip, Avatar } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { FormProvider, useForm } from "react-hook-form";
import { TextboxField } from "lib/form-fields";
import { ITag, useEditTag } from "modules/settings/apis/tags";
import { useNotifications } from "lib";
import { Edit } from "@mui/icons-material";
import { CancelButton, CustomIconButton, LoadingButton } from "lib/ui-ux";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IEditTagProps {
    open: boolean
    clickedTagDetails: { name: string, id: number, data: ITag[] }
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

    const { mutateAsync, isLoading } = useEditTag();
    const { showNotification } = useNotifications();
    const { t } = useTranslation();

    const onEditTagSubmit = (formValues: { editTagName: string }) => {
        mutateAsync({
            id: clickedTagDetails.id.toString(),
            name: formValues.editTagName
        }).then(() => showNotification({ message: t('tags_edit_success') }))
            .catch(() => showNotification({ message: t('tags_edit_error'), type: 'error' }))
            .finally(() => handleClose());
    }

    const onValidate = (value: string) => {
        const doesTagExist = clickedTagDetails.data.some((item) => item.name === value);
        if (doesTagExist) {
            return t('value_exists_validation');
        }
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
                    {t('edit_tag')}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Chip
                        label={clickedTagDetails.name}
                        sx={{ textDecoration: 'line-through' }}
                        size="medium"
                        avatar={<Avatar>{clickedTagDetails.name[0]?.toLocaleUpperCase()}</Avatar>} />
                    <ArrowRightAltIcon />
                    <TextboxField name="editTagName" id="outlined-basic" variant="standard" size="small" rules={{ validate: onValidate }} />
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleClose} />
                    <LoadingButton isLoading={isLoading} autoFocus variant="contained" onClick={form.handleSubmit(onEditTagSubmit)}>
                        {t('save')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}

export const EditTag = (props: { id: number; name: string, data: ITag[] }) => {
    const [isDialogShown, setDialogDisplay] = useState(false);
    const { t } = useTranslation();
    const toggleDrawer = useCallback(() => {
        setDialogDisplay((preValue) => !preValue);
    }, []);

    return (
        <>
            <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: t("edit_tag"), arrow: true }} onClick={toggleDrawer} />
            <EditTagDialog handleClose={toggleDrawer} open={isDialogShown} clickedTagDetails={props} />
        </>
    )
}