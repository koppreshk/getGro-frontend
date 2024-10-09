import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { Alert } from "@mui/material"
import { DashboardLayout } from "../components";
import { useModule } from "lib/hooks";

const StyledDashboardPage = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

export default function DashboardPage() {
    const isDashboardPageAccessible = useModule('dashboards');

    return (
        <>
            {
                isDashboardPageAccessible
                    ?
                    <StyledDashboardPage width="100%" height="100%" gap="15px" flexDirection="column">
                        <DashboardLayout />
                    </StyledDashboardPage>
                    :
                    <FlexBox width="100%" height="100%" justifyContent="center" alignItems="center">
                        <Alert severity="warning">You do not have the necessary access rights to view this page</Alert>
                    </FlexBox>
            }
        </>
    )
}