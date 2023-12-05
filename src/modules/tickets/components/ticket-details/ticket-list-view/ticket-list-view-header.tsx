import { FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import TuneIcon from '@mui/icons-material/Tune';
import { Chip, IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import { useMatch, useSearchParams } from "react-router-dom";

interface IStyledIconButtonProps {
    children?: React.ReactNode;
}

const StyledIconButton = (props: IStyledIconButtonProps) => (
    <IconButton color="primary" sx={{ border: '1px solid', borderColor: '#DAE2ED', borderRadius: '12px', ":hover": { bgcolor: "#fafafa" } }} disableRipple size="small">
        {props.children}
    </IconButton>
);


export const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const TicketListViewHeader = () => {
    const [searchParams] = useSearchParams();
    const match = useMatch('/tickets/:ticketType/:ticketId')
    const noOfRecords = searchParams.get('noOfRecords');
    const header = match?.params.ticketType?.split('-').map((item) => {
        const newString = item.charAt(0).toUpperCase() + item.slice(1);
        return newString;
    }).join(' ')

    return (
        <HeaderWrapper $width="100%" $justifyContent="space-between">
            <FlexBox $alignItems="center" $gap="10px">
                <SortIcon />
                <Typography variant="h6">{header}</Typography>
                <Chip label={noOfRecords} size="small" variant="filled" color="primary" />
            </FlexBox>
            <FlexBox $gap="5px">
                <StyledIconButton>
                    <ImportExportIcon fontSize="small" />
                </StyledIconButton>
                <StyledIconButton>
                    <TuneIcon fontSize="small" />
                </StyledIconButton>
            </FlexBox>
        </HeaderWrapper>
    )
}