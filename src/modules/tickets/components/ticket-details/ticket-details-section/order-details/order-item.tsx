import { Close, Info, Paid, ShoppingBagOutlined } from '@mui/icons-material';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { DrawerExtended, DrawerHeaderWrapper, FlexBox } from 'lib/ui-ux';
import { getFormatedNumberByLocale } from 'lib/utils';
import { IOrders } from 'modules/tickets/apis';
import { useState, memo } from 'react';
import styled from 'styled-components';

import {
  CurrencyINR,
  OrderDetailsDrawerContent,
} from './order-details-drawer-content';

interface IOrderViewProps {
  order: IOrders;
}

const StyledOrderNumber = styled(Typography)`
  && {
    background: #dfeee5;
    width: fit-content;
    padding: 4px 8px;
    border-radius: 6px;
    color: #008334;
    font-weight: 500;
    cursor: pointer;
  }
`;

const RelativePositionedFlexBox = styled(FlexBox)`
  position: relative;
`;

const MoreDetailsBtn = styled(IconButton)`
  && {
    position: absolute;
    right: 0px;
    top: -6px;
  }
`;

const OrderPLaceholderIconWrapper = styled(FlexBox)`
  background-color: #f1f1f1;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const StyledOrder = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.white};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  height: fit-content;
  margin-bottom: 10px;
  padding: 10px 12px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #f1f2f4;
`;

export const TextFieldValue = styled(Typography)`
  && {
    color: #68737d;
  }
`;

export const OrderItem = memo((props: IOrderViewProps) => {
  const { order } = props;
  const {
    order_number,
    financial_status,
    fulfillment_status,
    total_price,
    order_status_url,
  } = order;
  const [showDrawer, setDrawerDisplay] = useState(false);

  const toggleOrderDetailsDrawer = () => {
    setDrawerDisplay((preValue) => !preValue);
  };

  const renderHeader = () => {
    return (
      <DrawerHeaderWrapper flexDirection="column">
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h5">{`Order #${order_number}`}</Typography>
          <IconButton aria-label="Close" onClick={toggleOrderDetailsDrawer}>
            <Close />
          </IconButton>
        </FlexBox>
        <Tooltip title="Financial Status">
          <Chip
            icon={<Paid fontSize="small" />}
            label={financial_status}
            sx={{ width: 'fit-content' }}
            size="small"
          />
        </Tooltip>
      </DrawerHeaderWrapper>
    );
  };

  const openShopifyOrder = () => {
    window.open(order_status_url);
  };

  return (
    <>
      <StyledOrder gap="10px">
        <OrderPLaceholderIconWrapper alignItems="center" padding="0 8px">
          <ShoppingBagOutlined
            sx={{ width: '36px', height: '36px', fill: '#667287' }}
          />
        </OrderPLaceholderIconWrapper>
        <FlexBox width="calc(100% - 52px)">
          <FlexBox
            flexDirection="column"
            gap="10px"
            width="50%"
            justifyContent="space-between"
          >
            <FlexBox flexDirection="column">
              <Typography variant="h6">Order Number:</Typography>
              <StyledOrderNumber
                variant="subheading2"
                role="link"
                onClick={openShopifyOrder}
              >
                {'#' + order_number}
              </StyledOrderNumber>
            </FlexBox>
            <FlexBox flexDirection="column">
              <Typography variant="h6">Order Status:</Typography>
              <TextFieldValue variant="subheading2">
                {fulfillment_status ?? 'NA'}
              </TextFieldValue>
            </FlexBox>
          </FlexBox>
          <RelativePositionedFlexBox
            flexDirection="column"
            gap="10px"
            width="50%"
            justifyContent="space-between"
          >
            <FlexBox flexDirection="column">
              <Typography variant="h6">Price:</Typography>
              <TextFieldValue variant="subheading2" display="inline">
                <CurrencyINR />
                {getFormatedNumberByLocale(total_price)}
              </TextFieldValue>
            </FlexBox>
            <Tooltip title="More details" arrow placement="left">
              <MoreDetailsBtn onClick={toggleOrderDetailsDrawer}>
                <Info />
              </MoreDetailsBtn>
            </Tooltip>
            <FlexBox flexDirection="column">
              <Typography variant="h6">Payment Status:</Typography>
              <TextFieldValue variant="subheading2">
                {fulfillment_status ?? 'NA'}
              </TextFieldValue>
            </FlexBox>
          </RelativePositionedFlexBox>
        </FlexBox>
      </StyledOrder>
      <DrawerExtended
        anchor="right"
        width="420px"
        open={showDrawer}
        header={renderHeader}
        onRenderContent={() => (
          <OrderDetailsDrawerContent orderDetails={order} />
        )}
        onClose={toggleOrderDetailsDrawer}
      />
    </>
  );
});
