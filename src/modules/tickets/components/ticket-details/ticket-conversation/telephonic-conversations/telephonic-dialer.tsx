import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Call } from "@mui/icons-material";

const StyledDialogActions = styled(DialogActions)`
    && {
        padding: 8px 22px 22px;
    }
`;

const menuOptions = [
    {
        key: 'exotel-call',
        value: 'Exotel'
    },
    {
        key: 'ozonetel-call',
        value: 'Ozonetel'
    }
];

interface ITelephonicDialerProps {
    openCallPopUp: boolean;
    phoneNumber?: string;
    toggleCallBtn: () => void;
}

export const TelephonicDialer = (props: ITelephonicDialerProps) => {
    const { openCallPopUp, phoneNumber, toggleCallBtn } = props;
    const methods = useForm({ defaultValues: { 'phoneNumber': phoneNumber } });

    return (

        <Dialog open={openCallPopUp} onClose={toggleCallBtn} maxWidth="xs" fullWidth={true}>
            <DialogTitle sx={{ fontSize: '16px' }}>
                Make manual call
            </DialogTitle>
            <FormProvider {...methods}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Make a manual call to the customer
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <FlexBox $width="100%" $flexDirection="column" $gap="20px" >
                        <TextboxField name="phoneNumber" label="Phone Number" fullWidth />
                        <SelectField name="telephoneVendor" menuOptions={menuOptions} label="Select Vendor" fullWidth />
                    </FlexBox>
                </DialogContent>
                <StyledDialogActions>
                    <Button onClick={toggleCallBtn} variant="outlined">Cancel</Button>
                    <Button onClick={toggleCallBtn} variant="contained" fullWidth startIcon={<Call />}>Make Call</Button>
                </StyledDialogActions>
            </FormProvider>
        </Dialog>
    )
}