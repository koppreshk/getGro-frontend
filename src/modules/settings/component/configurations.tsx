import { Search } from "@mui/icons-material"
import { Typography, TextField, InputAdornment } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TicketsConfiguration } from "./ticket-configurations"
import styled from "styled-components";

const StyledHeader = styled(FlexBox)`
    background: white;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const StyledContent = styled(FlexBox)`
    background: #f9f9f9; 
`;

export const Configurations = () => {
    return (
        <>
            <StyledHeader width="100%" justifyContent="space-between" padding="20px" alignItems="center" >
                <Typography variant="h4">
                    Configurations
                </Typography>

                <TextField label="Search" name="search" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }} />
            </StyledHeader>
            <StyledContent flexDirection="column" height="100%">
                <TicketsConfiguration />
            </StyledContent>
        </>
    )
}