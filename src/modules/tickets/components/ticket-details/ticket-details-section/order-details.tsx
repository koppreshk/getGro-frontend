import React from "react"
import styled from "styled-components"
import { IconButton, Tooltip, Typography } from "@mui/material"
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { IOrders } from "modules/tickets/apis";
import { ChevronRight, ShoppingBagOutlined } from '@mui/icons-material';

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
            <FlexBox $padding="10px" $flexDirection="column">
                <Typography variant="h6">Order Details</Typography>
            </FlexBox>
            <HorizontalSeparator />
            <OrderWrappers $height="calc(100% - 93px)" $gap="10px" $flexDirection="column">
                {orderDetails.map((item) => {
                    return (
                        <Order key={item.id} {...item} />
                    )
                })}
            </OrderWrappers>
        </>
    )
});

const Order = (props: IOrders) => {
    const { orderNumber, lineItems, fulfillmentStatus, currency } = props;

    return (
        <StyledOrder $gap="10px">
            <OrderPLaceholderIconWrapper $alignItems="center" $padding="0 12px">
                <ShoppingBagOutlined sx={{ width: '48px', height: '48px' }} />
            </OrderPLaceholderIconWrapper>
            <FlexBox $width="calc(100% - 82px)">
                <FlexBox $flexDirection="column" $gap="10px" $width="50%">
                    <FlexBox $flexDirection="column">
                        <Typography variant="h6" fontSize="14px">Order Number:</Typography>
                        <TextFieldValue variant="body2" >{'#' + orderNumber}</TextFieldValue>
                    </FlexBox>
                    <FlexBox $flexDirection="column">
                        <Typography variant="h6" fontSize="14px">Item Name:</Typography>
                        <TextFieldValue variant="body2" >{lineItems[0].name}</TextFieldValue>
                    </FlexBox>
                </FlexBox>
                <RelativePositionedFlexBox $flexDirection="column" $gap="10px" $width="50%" >
                    <FlexBox $flexDirection="column">
                        <Typography variant="h6" fontSize="14px">Price:</Typography>
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
                    <FlexBox $flexDirection="column">
                        <Typography variant="h6" fontSize="14px">FulFillment Status:</Typography>
                        <TextFieldValue variant="body2" >{fulfillmentStatus}</TextFieldValue>
                    </FlexBox>
                </RelativePositionedFlexBox>
            </FlexBox>
        </StyledOrder>
    )
}