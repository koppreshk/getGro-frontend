import React from "react"
import styled from "styled-components"
import { ChevronRight, ShoppingBagOutlined } from '@mui/icons-material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { IconButton, Tooltip, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { IOrders } from "modules/tickets/apis";
import { CommonHeader } from "./common-header";

interface IOrderDetailsProps {
    orderDetails: IOrders[]
}

const OrderWrappers = styled(FlexBox)`
    background-color: #f5f7f9;
    padding: 10px;
`;

const StyledOrder = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: 8px;
    height: fit-content;
    margin-bottom: 10px;
    padding: 10px 12px;
    width: 100%;
    box-sizing: border-box;
`;

const TextFieldValue = styled(Typography)`
    &&{
        color: #68737d;
    }
`;

const RelativePositionedFlexBox = styled(FlexBox)`
    position: relative;
`;

const MoreDetailsBtn = styled(IconButton)`
    &&{
        position: absolute;
        right: -8px;
        top: 28px;
    }
`;

const OrderPLaceholderIconWrapper = styled(FlexBox)`
    background-color: #f1f1f1;
    border-radius: 8px;
`;

export const OrderDetails = React.memo((props: IOrderDetailsProps) => {
    const { orderDetails } = props;
    return (
        <>
            <CommonHeader headerName="Order Details" />
            {orderDetails.length ?
                <OrderWrappers height="calc(100% - 72px)" gap="10px" flexDirection="column">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                width={width}
                                itemCount={orderDetails.length}
                                itemSize={130}
                                height={height}>
                                {({ index, style }) => (
                                    <Order index={index} style={style} orderDetails={orderDetails} />
                                )}
                            </List>
                        )}
                    </AutoSizer>
                </OrderWrappers>
                :
                (
                    <FlexBox alignItems="center" justifyContent="center" height="100%">
                        <Typography>No orders found</Typography>
                    </FlexBox>
                )}
        </>
    )
});

interface IOrderViewProps {
    orderDetails: IOrders[];
    index: number;
    style: React.CSSProperties;
}

const Order = (props: IOrderViewProps) => {
    const { index, orderDetails } = props;
    const { orderNumber, lineItems, fulfillmentStatus, currency } = orderDetails[index];

    return (
        <StyledOrder gap="10px">
            <OrderPLaceholderIconWrapper alignItems="center" padding="0 12px">
                <ShoppingBagOutlined sx={{ width: '48px', height: '48px' }} />
            </OrderPLaceholderIconWrapper>
            <FlexBox width="calc(100% - 82px)">
                <FlexBox flexDirection="column" gap="10px" width="50%">
                    <FlexBox flexDirection="column">
                        <Typography variant="h6">Order Number:</Typography>
                        <TextFieldValue variant="body2" >{'#' + orderNumber}</TextFieldValue>
                    </FlexBox>
                    <FlexBox flexDirection="column">
                        <Typography variant="h6" >Item Name:</Typography>
                        <TextFieldValue variant="body2" >{lineItems[0].name}</TextFieldValue>
                    </FlexBox>
                </FlexBox>
                <RelativePositionedFlexBox flexDirection="column" gap="10px" width="50%" >
                    <FlexBox flexDirection="column">
                        <Typography variant="h6">Price:</Typography>
                        <span>
                            {currency === 'INR' && <Typography variant="body2" display="inline" >&#x20B9;</Typography>}
                            <TextFieldValue variant="body2" display="inline" >{lineItems[0].priceSet.presentmentMoney.amount}</TextFieldValue>
                        </span>
                    </FlexBox>
                    <Tooltip title="More details" arrow placement="left">
                        <MoreDetailsBtn>
                            <ChevronRight />
                        </MoreDetailsBtn>
                    </Tooltip>
                    <FlexBox flexDirection="column">
                        <Typography variant="h6">FulFillment Status:</Typography>
                        <TextFieldValue variant="body2" >{fulfillmentStatus}</TextFieldValue>
                    </FlexBox>
                </RelativePositionedFlexBox>
            </FlexBox>
        </StyledOrder>
    )
}