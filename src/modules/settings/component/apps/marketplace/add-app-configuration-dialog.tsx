import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, Breakpoint } from "@mui/material";

export interface IAddAppConfigurationDialogProps {
    togglePopup: () => void;
    openPopup: boolean;
    dialogContent: () => React.ReactNode;
    title: string;
    maxWidth? : Breakpoint;
}

export const AddAppConfigurationDialog = (props: IAddAppConfigurationDialogProps) => {
    const { openPopup, togglePopup, dialogContent, title, maxWidth } = props;

    return (
        <Dialog open={openPopup} onClose={togglePopup} fullWidth maxWidth={maxWidth}>
            <DialogTitle sx={{ fontSize: '16px' }}>
                {title}
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
            <DialogContent>
                {dialogContent()}
            </DialogContent>
        </Dialog>
    )
}