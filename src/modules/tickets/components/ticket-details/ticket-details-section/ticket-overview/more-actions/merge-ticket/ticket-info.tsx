import { Checkbox, Chip, Typography } from "@mui/material"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import styled, { useTheme } from "styled-components";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ITicketDetails } from "modules/tickets/apis";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";

const StyledTypography = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayTextVariant5};
    }
`;

interface TicketInfoProps {
    ticketDetails: Pick<ITicketDetails, 'description' | 'ticketStatus' | 'customerName' | 'ticketId'>
    isPrimary?: boolean;
    checked?: boolean;
    className?: string;
    multiSelect?: boolean;
    onSetAsPrimary?: () => void;
}

export const TicketInfo = (props: TicketInfoProps) => {
    const { isPrimary, checked, multiSelect, className } = props;
    const { description, ticketStatus, customerName, ticketId } = props.ticketDetails
    const { pallete } = useTheme();
    
    return (
        <FlexBox className={className} gap={'10px'} width="100%" alignItems="flex-start" padding="8px" style={{ borderBottom: multiSelect ? '1px solid' + pallete.grayVariant1 : 'unset' }}>
            {multiSelect ?
                <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    checked={checked}
                    sx={{padding: '2px 8px'}}
                /> : null}
            <FlexBox flexDirection="column" gap={'10px'} width="100%">
                <StyledTypography variant="body2">{description}</StyledTypography>
                <FlexBox justifyContent="space-between" width="100%">
                    <FlexBox renderSeparator={() => <VerticalSeparator />} gap={'10px'} alignItems="center">
                        <StyledTypography variant="body3">{'#' + ticketId.split('-')[0]}</StyledTypography>
                        <StyledTypography variant="body3">{ticketStatus}</StyledTypography>
                        <StyledTypography variant="body3">{customerName}</StyledTypography>
                    </FlexBox>
                    {isPrimary ? <Chip icon={<CheckCircleOutlineIcon />} label="Primary" color="success" size="small" /> : null}
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}