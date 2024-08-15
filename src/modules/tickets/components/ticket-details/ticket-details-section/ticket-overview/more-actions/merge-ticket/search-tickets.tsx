import { TextField, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"

export const SearchTickets = () => {

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        console.log(ev.target.value);
    }

    return (
        <FlexBox flexDirection="column" gap={'5px'}>
            <TextField
                name="searchText"
                fullWidth placeholder="Search a secondary ticket by ID or Subject"
                size="small"
                autoFocus
                onChange={onChange} />
            <Typography variant="body3">Search and add secondary tickets that you want to merge with primary tickets</Typography>
        </FlexBox>
    )
}