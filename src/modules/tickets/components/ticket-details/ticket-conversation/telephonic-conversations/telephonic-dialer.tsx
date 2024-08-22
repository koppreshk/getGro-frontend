
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Call } from "@mui/icons-material";
import { useExotelServices } from "lib";

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

interface TelephonicDialerFormFields {
    phoneNumber: string;
}

export const TelephonicDialer = (props: ITelephonicDialerProps) => {
    const { openCallPopUp, phoneNumber, toggleCallBtn } = props;
    const methods = useForm<TelephonicDialerFormFields>({ defaultValues: { 'phoneNumber': phoneNumber } });
    const { callActive, isDeviceRegistered, dial, hangup } = useExotelServices();

    const validatePhoneNum = (num: string) => {
        if (/^\+?[0-9]{10,14}$/.test(num)) {
            return undefined;
        }
        return 'Please input valid number'
    }

    return (
        <Dialog open={openCallPopUp} onClose={toggleCallBtn} maxWidth="xs" fullWidth={true}>
            <DialogTitle sx={{ fontSize: '16px' }}>
                Make manual call
            </DialogTitle>
            {
                !isDeviceRegistered ? (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Waiting for device to register
                        </DialogContentText>
                    </DialogContent>
                ) :
                    (
                        <FormProvider {...methods}>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Make a manual call to the customer
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent>
                                <FlexBox width="100%" flexDirection="column" gap="20px" >
                                    <TextboxField name="phoneNumber" label="Phone Number" fullWidth rules={{ validate: validatePhoneNum }} />
                                    <SelectField name="telephoneVendor" menuOptions={menuOptions} label="Select Vendor" fullWidth />
                                </FlexBox>
                            </DialogContent>
                            <StyledDialogActions>
                                <Button onClick={toggleCallBtn} variant="outlined">Cancel</Button>
                                <Button onClick={methods.handleSubmit(dial)} variant="contained" fullWidth startIcon={<Call />}>Dial</Button>
                                <Button onClick={hangup} disabled={!callActive} variant="contained" fullWidth startIcon={<Call />}>Hangup</Button>
                            </StyledDialogActions>
                        </FormProvider>
                    )
            }
        </Dialog>
    )
}
