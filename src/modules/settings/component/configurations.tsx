import { Search } from "@mui/icons-material"
import { Typography, TextField, InputAdornment } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TicketsConfiguration } from "./ticket-configurations"

export const Configurations = () => {
    return (
        <>
            <FlexBox width="100%" justifyContent="space-between" padding="20px" alignItems="center">
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
            </FlexBox>
            <FlexBox>
                <TicketsConfiguration />
            </FlexBox>
        </>
    )
}