import { useCallback, useState, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { PersonRemove } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton } from 'lib/ui-ux';
import { useUnlinkCustomer } from 'modules/tickets/apis';

export const UnlinkCustomer = (props: { ticketId: string }) => {
    const [open, setOpen] = useState(false);
    const { showNotification } = useNotifications();
    const { mutateAsync } = useUnlinkCustomer();

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const unlinkCustomer = useCallback(() => {
        mutateAsync({ ticketId: props.ticketId }).then(() => {
            handleClose();
            showNotification({ message: 'Successfully unlinked the customer', type: 'success' })
        }).catch(() => {
            showNotification({ message: 'Failed to unlink the customer', type: 'error' })
        })
    }, [handleClose, mutateAsync, props.ticketId, showNotification])

    return (
        <Fragment>
            <CustomIconButton tooltipProps={{ title: 'Unlink Customer', arrow: true, placement: "left" }} iconComponent={<PersonRemove />} onClick={handleClickOpen} />
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