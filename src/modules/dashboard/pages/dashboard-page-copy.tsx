import { FlexBox } from "lib/ui-ux"
import { Alert, Typography } from "@mui/material"
import { useTheme } from "styled-components";
import { DashboardLayoutCopy } from "../components";
import { usePermissions } from "lib/hooks";

export default function DashboardPage() {
    const theme = useTheme();
    const { isDashboardPageAccessible } = usePermissions();

    return (
        <>
            {
                isDashboardPageAccessible
                    ?
                    <FlexBox width="100%" height="100%" padding="15px" gap="15px" flexDirection="column">
                        <Typography variant="h3" color={theme.pallete.primaryPurpleText} marginLeft={'16px'}>Dashboard</Typography>
                        <DashboardLayoutCopy />
                    </FlexBox>
                    :
                    <FlexBox width="100%" height="100%" justifyContent="center" alignItems="center">
                        <Alert severity="warning">You do not have the necessary access rights to view this page</Alert>
                    </FlexBox>
            }
        </>
    )
}