import { RadioButtonCheckedOutlined } from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate } from "lib/utils";
import { ITicketDetails } from "modules/tickets/apis";
import styled, { useTheme } from "styled-components";
import { rendersourceIcon } from "../../ticket-list-view";

const TimeLine = styled.div`
  width: 5px;
  height: calc(100% - 20px);
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
`;

const StyledContainer = styled(FlexBox)`
    background:  ${({ theme }) => theme.pallete.purpleLight};
    border-radius: 8px;
    padding: 8px;
    margin: 12px 0px;
    position: relative;
    width: calc(100% - 29px);

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        cursor: pointer;
    }
`;

export const PastTicketCard = (props: { item: ITicketDetails; onPastTicketClick: (ticktId: string) => void }) => {
    const { item, onPastTicketClick } = props;
    const { pallete } = useTheme();
    return (
        <FlexBox gap="5px" className="parent-container" >
            <FlexBox flexDirection="column" alignItems="center">
                <RadioButtonCheckedOutlined sx={{ color: pallete.primaryPurple }} />
                <TimeLine />
            </FlexBox>
            <StyledContainer className="child-container" gap="10px" alignItems="center" onClick={() => onPastTicketClick(item.ticketId)}>
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