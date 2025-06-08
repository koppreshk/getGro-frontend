import { Edit } from '@mui/icons-material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
} from '@mui/material';
import { useNotifications } from 'lib';
import { TextboxField } from 'lib/form-fields';
import { CancelButton, CustomIconButton, LoadingButton } from 'lib/ui-ux';
import { useEditDepartment } from 'modules/settings/apis/department';
import { ITag } from 'modules/settings/apis/tags';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IEditDepartmentProps {
  open: boolean;
  clickedTagDetails: { name: string; id: number; data: ITag[] };
  handleClose: () => void;
}

const EditDepartmentDialog = (props: IEditDepartmentProps) => {
  const { open, handleClose, clickedTagDetails } = props;
  const form = useForm<{ editTagName: string }>({
    shouldUnregister: true,
    defaultValues: {
      editTagName: '',
    },
  });

  const { mutateAsync, isLoading } = useEditDepartment();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onEditDepartmentSubmit = (formValues: { editTagName: string }) => {
    mutateAsync({
      id: clickedTagDetails.id.toString(),
      name: formValues.editTagName,
    })
      .then(() =>
        showNotification({ message: 'Successfully edited Department' })
      )
      .catch(() =>
        showNotification({
          message: 'Failed to edit the Department',
          type: 'error',
        })
      )
      .finally(() => handleClose());
  };

  const onValidate = (value: string) => {
    const doesTagExist = clickedTagDetails.data.some(
      (item) => item.name === value
    );
    if (doesTagExist) {
      return t('value_exists_validation');
    }
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Department</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <Chip
            label={clickedTagDetails.name}
            sx={{ textDecoration: 'line-through' }}
            size="medium"
            avatar={
              <Avatar>{clickedTagDetails.name[0]?.toLocaleUpperCase()}</Avatar>
            }
          />
          <ArrowRightAltIcon />
          <TextboxField
            name="editTagName"
            id="outlined-basic"
            variant="standard"
            size="small"
            rules={{ validate: onValidate }}
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <LoadingButton
            isLoading={isLoading}
            autoFocus
            variant="contained"
            onClick={form.handleSubmit(onEditDepartmentSubmit)}
          >
            {t('save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export const EditDepartment = (props: {
  id: number;
  name: string;
  data: ITag[];
}) => {
  const [isDialogShown, setDialogDisplay] = useState(false);
  const toggleDrawer = useCallback(() => {
    setDialogDisplay((preValue) => !preValue);
  }, []);

  return (
    <>
      <CustomIconButton
        iconComponent={<Edit />}
        tooltipProps={{ title: 'Edit Department', arrow: true }}
        onClick={toggleDrawer}
      />
      <EditDepartmentDialog
        handleClose={toggleDrawer}
        open={isDialogShown}
        clickedTagDetails={props}
      />
    </>
  );
};
