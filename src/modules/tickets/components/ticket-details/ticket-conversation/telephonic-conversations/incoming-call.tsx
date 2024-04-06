import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { CallEnd, CallRounded } from "@mui/icons-material"
import { Avatar, Dialog, IconButton, Typography } from "@mui/material"

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

export const IncomingCall = () => {
    return (
        <>
            <Dialog open={false} maxWidth="xs">
                <FlexBox padding="20px 25px" gap="15px" flexDirection="column" alignItems="center">
                    <FlexBox flexDirection="column" gap="5px" alignItems="center">
                        <Typography variant="body1">+91-9457294748</Typography>
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
                </FlexBox>
            </Dialog>
        </>
    )
}