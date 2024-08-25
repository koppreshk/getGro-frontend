
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, } from "@mui/material"
import { TextboxField } from "lib/form-fields";
import { FlexBox, MoreInformation } from "lib/ui-ux";
import { Call } from "@mui/icons-material";
import { useExotelServices } from "lib";
import CloseIcon from '@mui/icons-material/Close';
import { CallStatusIconWrapper, getCallStatusIcon } from "./telephonic-conversations";

const StyledDialogActions = styled(DialogActions)`
    && {
        padding: 8px 22px 22px;
    }
`;

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
    const methods = useForm<TelephonicDialerFormFields>({ defaultValues: { phoneNumber: phoneNumber } });
    const { callActive, isDeviceRegistered, dial, hangup } = useExotelServices();

    const validatePhoneNum = (num: string) => {
        if (/^\+?[0-9]{10,14}$/.test(num)) {
            return undefined;
        }
        return 'Please input valid number'
    }

    return (
        <Dialog open={openCallPopUp} maxWidth="xs" fullWidth={true}>
            <DialogTitle sx={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Make manual call
                <IconButton onClick={toggleCallBtn}>
                    <CloseIcon />
                </IconButton>
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
                                <FlexBox width="100%" flexDirection="column" gap="20px">
                                    {callActive ?
                                        <FlexBox flexDirection="column" gap={'20px'}>
                                            <FlexBox gap={'10px'} alignItems="center">
                                                <CallStatusIconWrapper justifyContent="center" alignItems="center" $callStatus={'outgoing'}>
                                                    {getCallStatusIcon('outgoing')}
                                                </CallStatusIconWrapper>
                                                <FlexBox flexDirection="column">
                                                    <Typography variant="body2" >Calling</Typography>
                                                    <Typography variant="h6" >{methods.watch('phoneNumber')}</Typography>
                                                </FlexBox>
                                            </FlexBox>
                                            <MoreInformation information="Once the call is connected, the current dialog box will be closed and a different incoming call dialog box will appear, you need to accept that call to connect with customer" />
                                        </FlexBox> :
                                        <TextboxField
                                            name="phoneNumber"
                                            sx={{ mt: '10px' }}
                                            label="Phone Number"
                                            fullWidth rules={{ validate: validatePhoneNum }} />}
                                </FlexBox>
                            </DialogContent>
                            <StyledDialogActions>
                                <Button onClick={methods.handleSubmit(dial)} disabled={callActive} variant="contained" fullWidth startIcon={<Call />}>Dial</Button>
                                <Button onClick={hangup} disabled={!callActive} variant="contained" fullWidth startIcon={<Call />}>Hangup</Button>
                            </StyledDialogActions>
                        </FormProvider>
                    )
            }
        </Dialog>
    )
}

