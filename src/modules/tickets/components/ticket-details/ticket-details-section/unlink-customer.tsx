import { useCallback, useState, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, IconButton } from '@mui/material';
import { PersonRemove } from '@mui/icons-material';
import { useAppDispatch } from 'lib/hooks';
import { setLinkedCustomer } from 'modules/tickets/storage';
import { useNotifications } from 'lib';

export const UnlinkCustomer = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { showNotification } = useNotifications();

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const unlinkCustomer = useCallback(() => {
        dispatch(setLinkedCustomer({
            email: undefined,
            name: undefined,
            phoneNumber: undefined,
            ticketId: undefined,
            customerId: undefined
        }));
        handleClose();
        showNotification({ message: 'Successfully unlinked the customer', type: 'success' })
    }, [dispatch, handleClose, showNotification])

    return (
        <Fragment>
            <Tooltip title="Unlink Customer" arrow placement="left">
                <IconButton onClick={handleClickOpen}>
                    <PersonRemove />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Unlink Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to unlink this customer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={unlinkCustomer} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}