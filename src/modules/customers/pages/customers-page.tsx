import { FlexBox } from "lib/ui-ux"
import styled from "styled-components";
import { commonStyles } from "lib/ui-ux/common-styles";
import { CustomerViews } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import { IndivisualCustomerContainer } from "../containers";

const Container = styled(FlexBox)`
    ${commonStyles.sleekScrollStyle};
`;

export default function CustomersPage() {
    return (
        <Container height="100%">
            <CustomerViews />
            <div style={{ width: 'calc(100% - 200px)' }}>
                <Routes>
                    <Route key="default" path="*" element={<Navigate to="/customers/indivisual" replace={true} />} />
                    <Route key="indivisual" path="/indivisual" element={<IndivisualCustomerContainer />} />
                    <Route key="organzation" path="/organzation" />
                    <Route key="channel-partner" path="/channel-partner" />
                </Routes>
            </div>
        </Container>
    )
}