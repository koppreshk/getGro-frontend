import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"

export const TicketEscalationLayout = () => {
    return (
        <>
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <Typography variant="h5">Ticket Escalation</Typography>
                <Button variant="contained" startIcon={<Add />}>Add Escalation</Button>
            </FlexBox>
        </>
    )
}