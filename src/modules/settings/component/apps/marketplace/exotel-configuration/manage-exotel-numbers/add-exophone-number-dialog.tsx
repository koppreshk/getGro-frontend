import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { AddExophoneNumberContainer } from "modules/settings/containers/marketplace/exotel";

export const AddExophoneNumberDialog = (props: { openAddExoPopup: boolean, toggleAddExoPopup: () => void }) => {
    const {openAddExoPopup, toggleAddExoPopup} = props;

    return (
        <Dialog open={openAddExoPopup} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontSize: '16px' }}>
                Add Exotel Number
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={toggleAddExoPopup}
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
                <AddExophoneNumberContainer togglePopup={toggleAddExoPopup} />
            </DialogContent>
        </Dialog>
    )
}
