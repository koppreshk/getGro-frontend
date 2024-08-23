import React from "react";
import styled, { css, useTheme } from "styled-components"
import { Mic, MicOff, Phone, PhonePaused, RadioButtonChecked } from "@mui/icons-material";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import { useExotelServices } from "lib";
import { FlexBox } from "lib/ui-ux";
import { Timer } from "./timer";

const Card = styled(FlexBox)`
    position: fixed;
    left: 5%;
    padding: 20px;
    width: 300px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    bottom: 10px;
    backdrop-filter: blur(10px) saturate(170%);
    -webkit-backdrop-filter: blur(10px) saturate(170%);
    background-color: rgba(0, 0, 0, 0.73);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);

    animation: myAnim 0.5s ease 0s 1 normal forwards;
    @keyframes myAnim {
	0% {
		opacity: 0;
		transform: translateY(250px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
`;

const IncomingCallHeader = styled(FlexBox)`

`;

const IncomingCallFooter = styled(FlexBox)`
    
`;

const IconWrapper = styled(FlexBox) <{ $buttonType: string }>`
    ${({ $buttonType }) =>
        $buttonType === 'mic' ? css`
            background-color: #00B94D;
            color: #ffff;
            &:hover {
                background-color: #2e7d32;
            }
        ` : $buttonType === 'recording' ? css`
            background-color: #666768;
            color: #be0000;
            &:hover {
                background-color: #5a5b5c;
            }
        ` : $buttonType === 'phone' ? css`
            background-color: #d32f2f;
            color: #ffff;
            &:hover {
                background-color: #c62828;
            }
        `  : css`
            background-color: #666768;
            color: ${({ theme }) => theme.pallete.grayVariant1};
            &:hover {
                background-color: #5a5b5c;
            }
        `
    }

    height: 40px;
    width: 40px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
`;

const StyledTimer = styled(Timer)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant4};
    }
`;

const CardComponent = () => {
    const { pallete } = useTheme();
    const [isCallAnswered, setIsCallAnswered] = React.useState(false);
    const { accept, hangup, incomingCallDetails } = useExotelServices();
    const [isMuted, setIsMuted] = React.useState(false);
    const [isCallOnHold, setCallOnHold] = React.useState(false);

    const onAcceptCall = () => {
        setIsCallAnswered((prev) => !prev);
        accept();
    }

    const onMute = () => {
        incomingCallDetails?.MuteToggle();
        setIsMuted(pre => !pre);
    }

    const onHold = () => {
        incomingCallDetails?.HoldToggle();
        setCallOnHold(pre => !pre);
    }

    return (
        <Card flexDirection="column" gap="16px">
            <IncomingCallHeader flexDirection='row' gap="12px" alignItems="center">
                <Avatar sx={{ color: '#ffff', bgcolor: '#a7a7a7', width: 56, height: 56 }}></Avatar>
                <FlexBox flexDirection="column">
                    <Typography variant="body1" color={pallete.white} sx={{ fontSize: '18px' }}>{incomingCallDetails?.callFromNumber || 'Phone Number'}</Typography>
                    {/* <Typography variant="h6" color={pallete.white}>Michelle O'Connor</Typography> */}
                    {isCallAnswered ?
                        <StyledTimer />
                        :
                        <Typography variant="subheading2" color={pallete.grayVariant4}>Incoming call...</Typography>
                    }
                </FlexBox>
            </IncomingCallHeader>

            {isCallAnswered ?
                <IncomingCallFooter flexDirection="row" justifyContent="space-between">

                    <Tooltip title="Mute/Un-mute" arrow placement="bottom">
                        <IconWrapper alignItems="center" justifyContent="center" $buttonType="mic" onClick={onMute}>
                            {isMuted ? <MicOff /> : <Mic />}
                        </IconWrapper>
                    </Tooltip>

                    <FlexBox flexDirection="row" gap="9px">
                        <Tooltip title="Call recording in progress" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="recording">
                                <RadioButtonChecked />
                            </IconWrapper>
                        </Tooltip>

                        {/* <Tooltip title="Keypad" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="normal">
                                <AppsRounded />
                            </IconWrapper>
                        </Tooltip> */}
                        <Tooltip title="Hold call" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="normal" onClick={onHold}>
                                {isCallOnHold ? <Phone /> : <PhonePaused />}
                            </IconWrapper>
                        </Tooltip>
                    </FlexBox>

                    <Tooltip title="End Call" arrow placement="bottom">
                        <IconWrapper alignItems="center" justifyContent="center" $buttonType="phone" onClick={hangup}>
                            <Phone sx={{ transform: 'rotate(135deg)' }} />
                        </IconWrapper>
                    </Tooltip>

                </IncomingCallFooter>
                :
                <IncomingCallFooter flexDirection="row" gap="10px">
                    <Button variant="contained" color="error" fullWidth startIcon={<Phone sx={{ transform: 'rotate(135deg)' }} />} onClick={hangup}>
                        Reject
                    </Button>
                    <Button variant="contained" color="success" fullWidth startIcon={<Phone />} onClick={onAcceptCall}>
                        Answer
                    </Button>
                </IncomingCallFooter>
            }
        </Card>
    )
}


export const IncomingCallMain = () => {
    const { isIncomingCall } = useExotelServices();

    return (
        <>
            {isIncomingCall && <CardComponent />}
        </>
    )
}
