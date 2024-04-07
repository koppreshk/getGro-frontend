import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { CallEnd, CallRounded } from "@mui/icons-material"
import { Avatar, Dialog, IconButton, Typography } from "@mui/material"
import React, { useState } from "react";
import { useSocket } from "lib/providers/socket";
// import { useAuth } from "modules/login";

const ReceiveCallBtn = styled(IconButton)`
    &&{
        background-color: ${({ theme }) => theme.pallete.primaryPurple};
        color: #fff;

        &:hover {
            background-color: ${({ theme }) => theme.pallete.primaryPurpleText};
        }
    }
`;

const EndCallBtn = styled(IconButton)`
    &&{
        background-color: #d32f2f;
        color: #fff;

        &:hover {
            background-color: #d32f2f;
        }
    }
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

export const IncomingCall = () => {
    const { socket } = useSocket();
    const [showIncomingCallDialog, setDialogDisplay] = useState(false);
    const [callData, setCallData] = useState<IIncomingCall | undefined>();
    // const { user } = useAuth();

    React.useEffect(() => {
        socket.on('production_incoming_call', (info: string) => {
            const parsedInfo = JSON.parse(info) as IIncomingCall;
            if (parsedInfo.event_type === 'Dial') {
                setDialogDisplay(true);
                setCallData(parsedInfo);
            } else if (parsedInfo.event_type === 'Terminal') {
                setDialogDisplay(false);
                setCallData(undefined);
            }
        })
    }, [socket]);

    return (
        <>
            <Dialog open={showIncomingCallDialog} maxWidth="xs">
                {callData
                    ? <FlexBox padding="20px 25px" gap="15px" flexDirection="column" alignItems="center">
                        <FlexBox flexDirection="column" gap="5px" alignItems="center">
                            <Typography variant="body1">{callData.call_from}</Typography>
                            <Typography variant="subheading2">is calling you</Typography>
                        </FlexBox>
                        <Avatar />
                        <FlexBox justifyContent="space-between" width="100%">
                            <ReceiveCallBtn>
                                <CallRounded sx={{ width: 24 }} />
                            </ReceiveCallBtn>
                            <EndCallBtn  >
                                <CallEnd sx={{ width: 24 }} />
                            </EndCallBtn>
                        </FlexBox>
                    </FlexBox> : null}
            </Dialog>
        </>
    )
}