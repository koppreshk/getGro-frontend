
import { AppsRounded, Mic, Phone, PhonePaused, RadioButtonChecked } from "@mui/icons-material";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
// import { useSocket } from "lib/providers/socket";
import { FlexBox } from "lib/ui-ux";
import React from "react";
import { useState } from "react";
import styled, { css, useTheme } from "styled-components"


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

interface IIncomingCall {
    call_from: string;
    call_to: string;
    direction: string;
    current_time: string;
    dial_whom_number: string;
    status: string;
    event_type: string;
    agent_email: string;
}

interface IIncomingCallCardComponent {
    OnClickEndCall: () => void;
    callData: IIncomingCall | undefined
}

const CardComponent = (props: IIncomingCallCardComponent) => {
    const { OnClickEndCall, callData } = props;
    const { pallete } = useTheme();
    const [isCallAnswered, setIsCallAnswered] = React.useState(false);

    return (
        <Card flexDirection="column" gap="16px">

            <IncomingCallHeader flexDirection='row' gap="12px" alignItems="center">
                <Avatar sx={{ color: '#ffff', bgcolor: '#a7a7a7', width: 56, height: 56 }}>MO</Avatar>
                <FlexBox flexDirection="column">
                    <Typography variant="body1" color={pallete.white} sx={{ fontSize: '18px' }}>{callData?.call_from}</Typography>
                    <Typography variant="h6" color={pallete.white}>Michelle O'Connor</Typography>
                    {isCallAnswered ?
                        <Typography variant="subheading2" color={pallete.grayVariant4}>Call in progress 00:30</Typography>
                        :
                        <Typography variant="subheading2" color={pallete.grayVariant4}>Incoming call...</Typography>
                    }
                </FlexBox>
            </IncomingCallHeader>

            {isCallAnswered ?
                <IncomingCallFooter flexDirection="row" justifyContent="space-between">

                    <Tooltip title="Mute/Un-mute" arrow placement="bottom">
                        <IconWrapper alignItems="center" justifyContent="center" $buttonType="mic" >
                            <Mic />
                        </IconWrapper>
                    </Tooltip>

                    <FlexBox flexDirection="row" gap="9px">
                        <Tooltip title="Call recording in progress" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="recording">
                                <RadioButtonChecked />
                            </IconWrapper>
                        </Tooltip>

                        <Tooltip title="Keypad" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="normal">
                                <AppsRounded />
                            </IconWrapper>
                        </Tooltip>
                        <Tooltip title="Hold call" arrow placement="bottom">
                            <IconWrapper alignItems="center" justifyContent="center" $buttonType="normal">
                                <PhonePaused />
                            </IconWrapper>
                        </Tooltip>
                    </FlexBox>

                    <Tooltip title="End Call" arrow placement="bottom">
                        <IconWrapper alignItems="center" justifyContent="center" $buttonType="phone" onClick={OnClickEndCall}>
                            <Phone sx={{ transform: 'rotate(135deg)' }} />
                        </IconWrapper>
                    </Tooltip>

                </IncomingCallFooter>
                :
                <IncomingCallFooter flexDirection="row" gap="10px">
                    <Button variant="contained" color="error" fullWidth startIcon={<Phone sx={{ transform: 'rotate(135deg)' }} />} onClick={OnClickEndCall}>
                        Reject
                    </Button>
                    <Button variant="contained" color="success" fullWidth startIcon={<Phone />} onClick={() => setIsCallAnswered(true)}>
                        Answer
                    </Button>
                </IncomingCallFooter>
            }
        </Card>
    )
}


export const IncomingCallMain = () => {
    // const { socket } = useSocket();
    const [showIncomingCallDialog, setDialogDisplay] = useState(false);
    const [callData] = useState<IIncomingCall | undefined>();
    // const { user } = useAuth();

    // React.useEffect(() => {
    //     socket.on('production_incoming_call', (info: string) => {
    //         const parsedInfo = JSON.parse(info) as IIncomingCall;
    //         if (parsedInfo.event_type === 'Dial') {
    //             setDialogDisplay(true);
    //             setCallData(parsedInfo);
    //         } else if (parsedInfo.event_type === 'Terminal') {
    //             setDialogDisplay(false);
    //             setCallData(undefined);
    //         }
    //     })
    //     return () => {
    //         socket.off('production_incoming_call')
    //     }
    // }, [socket]);

    const OnClickEndCall = () => {
        setDialogDisplay(!showIncomingCallDialog);
    };

    return (
        <>
            {showIncomingCallDialog && <CardComponent OnClickEndCall={OnClickEndCall} callData={callData} />}
        </>
    )
}
