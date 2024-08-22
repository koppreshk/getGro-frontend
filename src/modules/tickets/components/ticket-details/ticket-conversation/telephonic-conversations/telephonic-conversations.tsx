import { CallMade, CallMissed, CallReceived } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"
import { capitalizeFirstLetter } from "lib/utils";
import { Call, ICallsByTicketId } from "modules/tickets/apis";
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

const TelephonicConversationCard = (props: { data: Call }) => {
    const { agent_name, date, direction, duration, from, to, url } = props.data;
    const { pallete } = useTheme();

    return (
        <CardWrapper gap="10px">
            <FlexBox justifyContent="center" alignItems="center" width="10%">
                <Tooltip title={`${direction} call`} arrow placement="bottom">
                    <IconWrapper justifyContent="center" alignItems="center" $callStatus={direction}>
                        {CallStatusIcon(direction)}
                    </IconWrapper>
                </Tooltip>
            </FlexBox>
            <FlexBox flexDirection="column" gap="5px" width="88%">
                <FlexBox flexDirection="row" justifyContent="space-between" alignItems="baseline">
                    <Typography variant="h6">{agent_name}</Typography>
                    <Typography variant="body2">{date}</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="subtitle1" color={pallete.green}>{from}</Typography>
                    <FlexBox flexDirection="row" justifyContent="space-between">
                        <FlexBox gap="8px">
                            <Typography variant="body2">{capitalizeFirstLetter(direction)} call,</Typography>
                            <Typography variant="body2">{duration}</Typography>
                        </FlexBox>
                        <Typography variant="body2">Call To: {to}</Typography>
                    </FlexBox>
                </FlexBox>
                <audio controls>
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </FlexBox>
        </CardWrapper>
    )
};

export const TelephonicConversationsLayout = (props: { data: ICallsByTicketId }) => {
    const { data } = props;
    return (
        <FlexBox flexDirection="column" width="100%" overflowY="auto">
            {data.calls.map((data, index) => <TelephonicConversationCard data={data} key={index} />)}
        </FlexBox>
    )
}

