import { CallMade, CallMissed, CallReceived } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"
import { capitalizeFirstLetter } from "lib/utils";
import styled, { useTheme } from "styled-components"

const CardWrapper = styled(FlexBox)`
    border-radius: 5px;
    border: ${({ theme }) => theme.semantics.standardBorder};
    margin: 10px 10px 0 10px;
    padding: 15px 10px 15px 15px;
    box-sizing: border-box;
`;

const IconWrapper = styled(FlexBox) <{ $callStatus: string }>`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: ${({ $callStatus }) => $callStatus === 'incoming' || $callStatus === 'outgoing' ? '#D4EDDA' : $callStatus === 'missed' ? '#F8D7DA' : '#ffff'};
`;

const telephonincArray = [
    {
        name: 'Jon Snow',
        phoneNumber: '+91 8197004599',
        callDuration: '0 mins 33 secs',
        callTo: '+123 1800022111',
        callStatus: 'incoming',
        date: '11 Dec 2023, 12:20 pm'
    },
    {
        name: 'Cersie Lannister',
        phoneNumber: '+91 8197002399',
        callDuration: '10 mins 33 secs',
        callTo: '+123 1800022111',
        callStatus: 'outgoing',
        date: '11 Dec 2023, 12:20 pm'
    },
    {
        name: 'Arya Stark',
        phoneNumber: '+91 8197664019',
        callDuration: '1 mins 33 secs',
        callTo: '+123 1800022111',
        callStatus: 'missed',
        date: '11 Dec 2023, 12:20 pm'
    },
];

const CallStatusIcon = (callStatus: string) => {
    if (callStatus === 'incoming') {
        return (
            <CallMade sx={{ fill: '#47A83B' }} />
        );
    } else if (callStatus === 'outgoing') {
        return (
            <CallReceived sx={{ fill: '#47A83B' }} />
        );
    }
    else if (callStatus === 'missed') {
        return (
            <CallMissed sx={{ fill: '#C91C2E' }} />
        );
    }
}

interface ITelephonicConversationCardProps {
    data: {
        name: string;
        phoneNumber: string;
        callDuration: string;
        callTo: string;
        callStatus: string;
        date: string;
    }
}

const TelephonicConversationCard = (props: ITelephonicConversationCardProps) => {
    const { data: { callDuration, callStatus, callTo, name, phoneNumber, date } } = props;
    const { pallete } = useTheme();

    return (
        <CardWrapper gap="10px">
            <FlexBox justifyContent="center" alignItems="center" width="10%">
                <Tooltip title={`${callStatus} call`} arrow placement="bottom">
                    <IconWrapper justifyContent="center" alignItems="center" $callStatus={callStatus}>
                        {CallStatusIcon(callStatus)}
                    </IconWrapper>
                </Tooltip>
            </FlexBox>
            <FlexBox flexDirection="column" gap="5px" width="88%">
                <FlexBox flexDirection="row" justifyContent="space-between" alignItems="baseline">
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2">{date}</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="subtitle1" color={pallete.green}>{phoneNumber}</Typography>
                    <FlexBox flexDirection="row" justifyContent="space-between">
                        <FlexBox gap="8px">
                            <Typography variant="body2">{capitalizeFirstLetter(callStatus)} call,</Typography>
                            <Typography variant="body2">{callDuration}</Typography>
                        </FlexBox>
                        <Typography variant="body2">Call To: {callTo}</Typography>
                    </FlexBox>
                </FlexBox>

            </FlexBox>
        </CardWrapper>
    )
};

export const TelephonicConversationsLayout = () => {
    return (
        <>
            {telephonincArray.map((data, index) => <TelephonicConversationCard data={data} key={index} />)}
        </>
    )
}

