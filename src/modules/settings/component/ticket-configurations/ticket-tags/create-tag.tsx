
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useNotifications } from "lib";
import { TagInputField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { ITag, useCreateTags } from "modules/settings/apis/tags";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

interface ICreateTagProps {
    open: boolean;
    createdTags?: ITag[];
    handleClose: () => void;
}

interface IFormFields {
    createdTags: string[];
}

const StyledTags = styled(TagInputField)`
    padding: 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    border: ${({ theme }) => theme.semantics.standardBorder};
    width: 100%;
`;

export const CreateTag = (props: ICreateTagProps) => {
    const { open, createdTags, handleClose } = props;
    const { mutateAsync } = useCreateTags()
    const { showNotification } = useNotifications();
    const form = useForm<IFormFields>({
        mode: 'onChange'
    });

    const onCreateTagSubmit = (formData: IFormFields) => {
        mutateAsync({
            tags: formData.createdTags
        })
            .then(() => showNotification({ message: 'Successfully created Tags', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to create tags', type: 'error' }))
            .finally(() => handleClose())
    }

    const validateInput = (values: string[]) => {
        const someTagExists = createdTags?.some((item) => values.includes(item.name));
        if (someTagExists) {
            return 'One or more tags already exists, please remove and continue'
        }
    }

    return (
        <FormProvider {...form}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5">Create Tags</Typography>
                </DialogTitle>
                <DialogContent >
                    <FlexBox gap={'15px'} flexDirection="column">
                        <div>
                            <StyledTags
                                gap={"15px"}
                                autoFocus
                                name="createdTags"
                                dontShowDashes
                                placeholder="Add your tags here..."
                                rules={{ validate: validateInput }} />
                        </div>
                        <Typography variant="body3"><b>Note:</b> Add tags by pressing enter key and then save</Typography>
                    </FlexBox>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                    <Button autoFocus variant="contained" onClick={form.handleSubmit(onCreateTagSubmit)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}