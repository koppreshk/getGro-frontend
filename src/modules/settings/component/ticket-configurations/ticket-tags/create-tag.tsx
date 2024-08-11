
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { StyledTags } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview/tags";
import { useCallback, useState } from "react";

interface ICreateTagProps {
    open: boolean
    handleClose: () => void;
}

export const CreateTag = (props: ICreateTagProps) => {
    const { open, handleClose } = props;
    const [tags, setTags] = useState<string[]>([]);


    const onCreateTagSubmit = () => {
        console.log(tags);
        handleClose();
    }
    const onTagInputChange = useCallback((items: string[]) => {
        setTags(items);
    }, []);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant="h5">Create Tags</Typography>
            </DialogTitle>
            <DialogContent >
                <StyledTags
                    tagInputs={tags}
                    gap={"15px"}
                    autoFocus
                    placeholder="Add your tags here..."
                    onTagInputChange={onTagInputChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Close</Button>
                <Button autoFocus variant="contained" onClick={onCreateTagSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}