import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

const StyledHeaderContainer = styled(FlexBox)`
    min-height: 72px;
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

interface ICommonHeaderProps {
    headerName: string;
    renderFarPositionedItems?: () => React.ReactNode;
}

export const CommonHeader = (props: ICommonHeaderProps) => {
    const { headerName, renderFarPositionedItems } = props;
    return (
        <StyledHeaderContainer alignItems="center" justifyContent="space-between">
            <Typography fontWeight="500">{headerName}</Typography>
            {renderFarPositionedItems ? renderFarPositionedItems() : null}
        </StyledHeaderContainer>
    )
}