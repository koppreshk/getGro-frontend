import { TextField, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"

export const SearchTickets = () => {
    return (
        <FlexBox flexDirection="column" gap={'5px'}>
            <TextField
                name="searchText"
                fullWidth placeholder="Search a secondary ticket by ID or Subject"
                size="small" />
            <Typography variant="body3">Search and add secondary tickets that you want to merge with primary tickets</Typography>
        </FlexBox>
    )
}