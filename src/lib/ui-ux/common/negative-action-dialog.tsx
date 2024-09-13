
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

interface INegativeActionDialogProps {
    title: string;
    content: string | React.ReactNode;
    open: boolean;
    negativeActionLabel?: string;
    onClose: () => void;
    onNegativeActionClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NegativeActionDialog = (props: INegativeActionDialogProps) => {
    const { t } = useTranslation();
    const { open, title, content, negativeActionLabel = t("common.buttonLabels.delete"), onClose, onNegativeActionClick } = props;

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}>
                <DialogTitle variant='h5'>{title}</DialogTitle>
                <DialogContent>
                    {typeof content === 'string' ?
                        <DialogContentText variant='body3'>
                            {content}
                        </DialogContentText>
                        : content}
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Button onClick={onClose} variant='outlined' sx={{ mr: '8px' }}>{t("common.buttonLabels.cancel")}</Button>
                    <Button type="submit" variant='contained' color='error' onClick={onNegativeActionClick}>{negativeActionLabel}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
