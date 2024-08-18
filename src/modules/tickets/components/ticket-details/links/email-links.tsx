import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"

const StyledContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.grayVariant5};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.sm};
    height: 48px;
    padding: 0 20px;
    align-items: center;
`;

export const EmailLinks = () => {
    const links = [{ ticketId: '1', description: 'Refund related', status: 'Closed' }];

    return (
        <FlexBox flexDirection="column" padding="0px 0px" style={{ border: '1px solid #f1f2f4' }}>
            <StyledContainer>
                <FlexBox gap={'10px'} alignItems="center">
                    <ConfirmationNumberOutlined />
                    <Typography variant="h6">Related Tickets</Typography>
                </FlexBox>
            </StyledContainer>
            {links.map((item) => (
                <FlexBox key={item.ticketId} padding="20px">
                    <Typography variant="body2" sx={{ width: '80px' }}>{item.ticketId}</Typography>
                    <Typography variant="body2" sx={{ width: 'calc(100% - 80px)' }}>{item.description}</Typography>
                    <Typography variant="body2">{item.status}</Typography>
                </FlexBox>
            ))}
        </FlexBox>
    )
}