import { FlexBox } from 'lib/ui-ux';
import { commonStyles } from 'lib/ui-ux/common-styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { CustomerViews } from '../components';
import { AllCustomersContainer } from '../containers';

const Container = styled(FlexBox)`
  ${commonStyles.sleekScrollStyle};
`;

export default function CustomersPage() {
  return (
    <Container height="100%">
      <CustomerViews />
      <div style={{ width: 'calc(100% - 200px)' }}>
        <Routes>
          <Route
            key="default"
            path="*"
            element={<Navigate to="all-customers" replace={true} />}
          />
          {/* <Route
            key="active-customers"
            path="active-customers"
            element={<IndivisualCustomerContainer />}
          /> */}
          <Route
            key="all-customers"
            path="all-customers"
            element={<AllCustomersContainer />}
          />
          {/* <Route key="verified-customers" path="verified-customers" /> */}
        </Routes>
      </div>
    </Container>
  );
}
