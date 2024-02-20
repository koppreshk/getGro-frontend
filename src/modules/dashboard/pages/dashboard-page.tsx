import styled from "styled-components";
import { FlexBox } from "lib/ui-ux"
import { Alert } from "@mui/material"
import { DashboardLayout } from "../components";
import { usePermissions } from "lib/hooks";

const StyledDasboardPage = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
`;

export default function DashboardPage() {
    const { isDashboardPageAccessible } = usePermissions();

    return (
        <>
            {
                isDashboardPageAccessible
                    ?
                    <StyledDasboardPage width="100%" height="100%" padding="25px 15px 25px 25px" gap="15px" flexDirection="column">
                        <DashboardLayout />
                    </StyledDasboardPage>
                    :
                    <FlexBox width="100%" height="100%" justifyContent="center" alignItems="center">
                        <Alert severity="warning">You do not have the necessary access rights to view this page</Alert>
                    </FlexBox>
            }
        </>
    )
}