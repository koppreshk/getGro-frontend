
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface INegativeActionDialogProps {
    title: string;
    content: string;
    open: boolean;
    negativeActionLabel?: string;
    onClose: () => void;
    onNegativeActionClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NegativeActionDialog = (props: INegativeActionDialogProps) => {
    const { open, title, content, negativeActionLabel = 'Delete', onClose, onNegativeActionClick } = props;

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}>
                <DialogTitle variant='h5'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText variant='body3'>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant='contained' color='error' onClick={onNegativeActionClick}>{negativeActionLabel}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
