import { Chip, Typography } from "@mui/material";
import styled, { useTheme } from 'styled-components';
import { FlexBox } from "lib/ui-ux";
import { ITicketDetails } from "modules/tickets/apis"
import { rendersourceIcon } from "../../ticket-list-view";
import { getFormattedDate } from "lib/utils";
import { useLocation } from "react-router-dom";
import { CommonHeader } from "../common-header";
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

interface IPastTicketsLayoutProps {
    pastTickets: ITicketDetails[]
}

export const PastTicketsLayout = (props: IPastTicketsLayoutProps) => {
    const { pastTickets } = props;
    return (
        <>
            <PastTickets pastTickets={pastTickets} />
        </>
    )
}


const LayoutContainer = styled(FlexBox)`
    .parent-container:last-child{
        .child-container {
            margin-bottom: 0;
        }
    }
`;

const StyledContainer = styled(FlexBox)`
    background:  ${({ theme }) => theme.pallete.purpleLight};
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 20px;
    position: relative;
    width: calc(100% - 29px);

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        cursor: pointer;
    }
`;


const TimeLine = styled.div`
  width: 5px;
  height: calc(100% - 24px);
  border-radius: 16px;
  background-color: ${({ theme }) => theme.pallete.primaryPurple};
`;

const StyledChip = styled(Chip)`
    &&{
        font-size: 12px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-90%, -50%);
        background: ${({ theme }) => theme.pallete.primaryPurple};
        color: ${({ theme }) => theme.pallete.white};
    }
`

const PastTickets = (props: IPastTicketsLayoutProps) => {
    const { pastTickets } = props;
    const { pathname, search } = useLocation();

    const onPastTicketClick = (ticketId: string) => {
        const pathNameParts = pathname.split('/');
        pathNameParts[3] = ticketId;
        window.open(`${pathNameParts.join('/')}${search}`);
    }

    return (
        <>
            <CommonHeader headerName="Past Tickets" />
            <LayoutContainer padding="8px" flexDirection="column" height="calc(100% - 72px)">
                {pastTickets.length ?
                    pastTickets.map((item, idx) => (<PastTicketCard key={idx} item={item} onPastTicketClick={onPastTicketClick} />))
                    : (
                        <FlexBox alignItems="center" justifyContent="center" height="100%">
                            <Typography>No past tickets found</Typography>
                        </FlexBox>
                    )
                }
            </LayoutContainer>
        </>
    )
}


const PastTicketCard = (props: { item: ITicketDetails; onPastTicketClick: (ticktId: string) => void }) => {
    const { item, onPastTicketClick } = props;
    const { pallete } = useTheme();
    return (
        <FlexBox gap="5px" className="parent-container" >
            <FlexBox flexDirection="column" alignItems="center">
                <RadioButtonCheckedOutlinedIcon sx={{ color: pallete.primaryPurple }} />
                <TimeLine />
            </FlexBox>
            <StyledContainer  className="child-container" gap="10px" alignItems="center" onClick={() => onPastTicketClick(item.ticketId)}>
                {rendersourceIcon(item.source, { width: '1.5em', height: '1.5em' })}
                <FlexBox flexDirection="column" width="calc(100% - 46px)">
                    <StyledChip label={getFormattedDate(item.createdAt)} variant="filled" />
                    <Typography marginTop={'8px'} variant="caption">{item.ticketStatus}</Typography>
                    <Typography variant="body3" sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.ticketId}</Typography>
                </FlexBox>
            </StyledContainer>
        </FlexBox>
    )
}