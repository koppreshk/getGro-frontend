import { Typography, Chip } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { FlexBox, HorizontalSeparator, VerticalSeparator } from "lib/ui-ux";
import styled from "styled-components";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SearchTickets } from "./search-tickets";

const StyledTypography = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3};
    }
`;

export const MergeTicketContent = () => {
    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);
    const { description, ticketId, ticketStatus, customerName } = ticketDetails!;

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <FlexBox flexDirection="column" gap={'10px'} width="100%">
                <StyledTypography variant="body2">{description}</StyledTypography>
                <FlexBox justifyContent="space-between" width="100%">
                    <FlexBox renderSeparator={() => <VerticalSeparator />} gap={'10px'} alignItems="center">
                        <StyledTypography variant="body3">{'#' + ticketId.split('-')[0]}</StyledTypography>
                        <StyledTypography variant="body3">{ticketStatus}</StyledTypography>
                        <StyledTypography variant="body3">{customerName}</StyledTypography>
                    </FlexBox>
                    <Chip icon={<CheckCircleOutlineIcon />} label="Primary" color="success" size="small" />
                </FlexBox>
            </FlexBox>
            <HorizontalSeparator />
            <SearchTickets />
        </FlexBox>
    )
}