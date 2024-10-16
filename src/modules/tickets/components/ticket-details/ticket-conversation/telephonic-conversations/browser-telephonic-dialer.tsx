import { useEffect } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, } from "@mui/material"
import { TextboxField } from "lib/form-fields";
import { FlexBox, MoreInformation } from "lib/ui-ux";
import { Call } from "@mui/icons-material";
import { useExotelServices } from "lib";
import CloseIcon from '@mui/icons-material/Close';
import { CallStatusIconWrapper, getCallStatusIcon } from "./telephonic-conversations";
import { useTranslation } from "react-i18next";

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

export const BrowserTelephonicDialer = (props: ITelephonicDialerProps) => {
    const { openCallPopUp, phoneNumber, toggleCallBtn } = props;
    const methods = useForm<TelephonicDialerFormFields>({ defaultValues: { phoneNumber: phoneNumber } });
    const { callActive, isDeviceRegistered, dial, hangup, isIncomingCall } = useExotelServices();
    const { t } = useTranslation();

    const validatePhoneNum = (num: string) => {
        if (/^\+?[0-9]{10,14}$/.test(num)) {
            return undefined;
        }
        return 'Please input valid number'
    }

    useEffect(() => {
        if (isIncomingCall && openCallPopUp) {
            toggleCallBtn()
        }
    }, [isIncomingCall, openCallPopUp, toggleCallBtn])

    const onClose = () => {
        hangup();
        toggleCallBtn();
    }

    return (
        <Dialog open={openCallPopUp} maxWidth="xs" fullWidth={true}>
            <FormProvider {...methods}>
                <DialogTitle sx={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Make Browser Call
                    <IconButton onClick={onClose}>
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
                            <>
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
                                                label={t('phone_number')}
                                                fullWidth rules={{ validate: validatePhoneNum }} />
                                        }
                                    </FlexBox>
                                </DialogContent>
                                <StyledDialogActions>
                                    <Button onClick={methods.handleSubmit(dial)} disabled={callActive} variant="contained" fullWidth startIcon={<Call />}>Dial</Button>
                                    <Button onClick={hangup} disabled={!callActive} variant="contained" color="error" fullWidth startIcon={<Call />}>Hangup</Button>
                                </StyledDialogActions>
                            </>
                        )
                }
            </FormProvider>
        </Dialog>
    )
}

