import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { getFormatedNumberByLocale, getFormattedDate } from 'lib/utils';
import { IOrders } from 'modules/tickets/apis';

import { TextFieldValue } from './order-item';

export const OrderDetailsDrawerContent = (props: { orderDetails: IOrders }) => {
  const {
    created_at,
    shipping_address,
    line_items,
    total_tax,
    total_discounts,
    total_price,
    payment_gateway_names,
  } = props.orderDetails;

  return (
    <FlexBox flexDirection="column" padding="20px" gap="10px">
      <HeaderValue
        heading="Order placed on:"
        value={getFormattedDate(created_at)}
      />
      {shipping_address !== null ? (
        <HeaderValue
          heading="Shipping Address:"
          value={[
            shipping_address.address1,
            shipping_address.address2,
            shipping_address.city,
            shipping_address.country,
            shipping_address.zip,
          ]
            .filter((item) => item)
            .join(', ')}
        />
      ) : null}
      <HeaderValue
        heading="Payment mode:"
        value={payment_gateway_names.join(',')}
      />
      <FlexBox flexDirection="column">
        <Typography variant="h6">Items:</Typography>
        <FlexBox
          style={{ border: '1px solid #f1f2f4' }}
          flexDirection="column"
          gap="10px"
          padding="10px"
        >
          {line_items.map((item, idx) => (
            <FlexBox width="100%" key={idx} justifyContent="space-between">
              <Typography variant="subheading1">{item.name}</Typography>
              <FlexBox gap="15px">
                <Typography variant="subheading2">
                  {item.quantity}{' '}
                  <span style={{ fontFamily: 'Arial' }}>&#215;</span>{' '}
                  <CurrencyINR />
                  {getFormatedNumberByLocale(item.price)}
                </Typography>
                <Typography variant="subheading2">
                  <CurrencyINR />
                  {getFormatedNumberByLocale(
                    item.quantity * Math.abs(Number(item.price))
                  )}
                </Typography>
              </FlexBox>
            </FlexBox>
          ))}
          <FlexBox justifyContent="space-between">
            <Typography variant="subheading2">{'Discount'}</Typography>
            <Typography variant="subheading2" color="#388e3c">
              -<CurrencyINR />
              {getFormatedNumberByLocale(total_discounts)}
            </Typography>
          </FlexBox>
          <FlexBox justifyContent="space-between">
            <Typography variant="subheading2">{'Tax'}</Typography>
            <Typography variant="subheading2">
              <CurrencyINR />
              {getFormatedNumberByLocale(total_tax)}
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox
          justifyContent="space-between"
          padding="10px"
          style={{ background: '#f1f2f3' }}
        >
          <Typography variant="subheading2">{'Total'}</Typography>
          <Typography variant="subheading1">
            <CurrencyINR />
            {getFormatedNumberByLocale(total_price)}
          </Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const CurrencyINR = () => (
  <span style={{ fontFamily: 'Arial' }}>&#x20B9;</span>
);

export const HeaderValue = (props: { heading: string; value: string }) => {
  return (
    <>
      <FlexBox flexDirection="column">
        <Typography variant="h6">{props.heading}</Typography>
        <TextFieldValue variant="subheading2">{props.value}</TextFieldValue>
      </FlexBox>
    </>
  );
};
