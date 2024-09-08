import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from "@mui/material"
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Call } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { useFetchExotelAddedNumbers } from "modules/settings/apis/marketplace/exotel";
import { useOutboundCall } from "modules/tickets/apis/telephonic-apis";

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
    exotelAddedNumber: string
}

export const NormalTelephonicDialer = (props: ITelephonicDialerProps) => {
    const { phoneNumber, toggleCallBtn, openCallPopUp } = props;
    const methods = useForm<TelephonicDialerFormFields>({ defaultValues: { phoneNumber: phoneNumber } });
    const { data } = useFetchExotelAddedNumbers();
    const { mutateAsync } = useOutboundCall();

    const validatePhoneNum = (num: string) => {
        if (/^\+?[0-9]{10,14}$/.test(num)) {
            return undefined;
        }
        return 'Please input valid number'
    }

    const onClose = () => {
        toggleCallBtn();
    }

    const dial = (formData: TelephonicDialerFormFields) => {
        mutateAsync({ exophone: formData.exotelAddedNumber, to: formData.phoneNumber })
    }

    return (
        <Dialog open={openCallPopUp} maxWidth="xs" fullWidth={true}>
            <FormProvider {...methods}>
                <DialogTitle sx={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Make Normal Call
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FlexBox width="100%" flexDirection="column" gap="20px">
                        <FlexBox flexDirection="column" gap={'10px'} >
                            <SelectField
                                name="exotelAddedNumber"
                                label={'Exotel Number'} sx={{ mt: '5px' }}
                                menuOptions={data?.map((item) => ({ key: item.phone_number, value: item.phone_number })) || []}
                                rules={{ required: 'Please select a number to dial from' }} />
                            <TextboxField
                                name="phoneNumber"
                                sx={{ mt: '10px' }}
                                label="Phone Number"
                                fullWidth rules={{ validate: validatePhoneNum }} />
                        </FlexBox>
                    </FlexBox>
                </DialogContent>
                <StyledDialogActions>
                    <Button onClick={methods.handleSubmit(dial)} variant="contained" fullWidth startIcon={<Call />}>Dial</Button>
                </StyledDialogActions>
            </FormProvider>
        </Dialog >
    )
}

