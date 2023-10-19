import { FlexBox } from "lib/ui-ux"
import SortIcon from '@mui/icons-material/Sort';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import TuneIcon from '@mui/icons-material/Tune';
import { Chip, IconButton, Typography } from "@mui/material";
import styled from "styled-components";

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
    border-bottom: 1px solid #e9ebed;
`;

export const TicketListViewHeader = () => {
    return (
        <HeaderWrapper $width="100%" $justifyContent="space-between">
            <FlexBox $alignItems="center" $gap="10px">
                <SortIcon />
                <Typography variant="h6">Unassigned</Typography>
                <Chip label={100} size="small" variant="filled" color="primary" />
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