import styled from "styled-components";
import { Outlet, useSearchParams } from 'react-router-dom';
import { Search } from "@mui/icons-material"
import { Typography, TextField, InputAdornment } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TicketsConfiguration } from "./ticket-configurations"
import { Suspense } from "react";
import { Trans } from "react-i18next";


const StyledHeader = styled(FlexBox)`
    background: white;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const StyledContent = styled(FlexBox)`
    
`;

export const Configurations = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        if (ev.target.value.length) {
            searchParams.set('searchText', ev.target.value);
            setSearchParams(searchParams);
            return;
        }
        searchParams.delete('searchText');
        setSearchParams(searchParams);
    }
    return (
        <>
            <Suspense fallback={<div>Loading Content...</div>}>
                <Outlet />
            </Suspense>
            <StyledHeader width="100%" justifyContent="space-between" padding="20px" alignItems="center" >
                <Typography variant="h4">
                    <Trans i18nKey={"modules.configurations.moduleHeading"}/>
                </Typography>

                <TextField label="Search" name="search" size="small" onChange={onChange} placeholder="Search By Name" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }} />
            </StyledHeader>
            <StyledContent flexDirection="column" height="calc(100% - 81px)" overflowY="auto">
                <TicketsConfiguration />
            </StyledContent>
        </>
    )
}