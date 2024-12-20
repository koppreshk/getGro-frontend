import { Typography } from '@mui/material';
import { CenteredCircularProgress, FlexBox } from 'lib/ui-ux';
import { OrderDetails } from 'modules/tickets/components/ticket-details/ticket-details-section/order-details/order-details';
import { useFormContext } from 'react-hook-form';

import { useFetchAllOrders } from '../../apis';

export const OrderDetailsContainer = (props: {
  customerId: string | null | undefined;
}) => {
  const { customerId } = props;

  const { watch } = useFormContext();
  const { data: orderData, isLoading: orderDataLoading } = useFetchAllOrders(
    watch('stores'),
    customerId!
  );

  if (orderDataLoading) {
    return <CenteredCircularProgress />;
  }

  if (orderData) {
    return <OrderDetails orderDetails={orderData} />;
  }

  return (
    <FlexBox justifyContent="center" alignItems="center" height="80%">
      <Typography variant="body3" sx={{ padding: '0 16px' }}>
        Failed to load orders for the selected store
      </Typography>
    </FlexBox>
  );
};
