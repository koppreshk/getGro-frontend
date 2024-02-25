import { ChevronRight, ShoppingBagOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { DrawerExtended, FlexBox } from "lib/ui-ux";
import { IOrders } from "modules/tickets/apis";
import { useState } from "react";
import styled from "styled-components";
import { OrderDetailsDrawerContent } from "./order-details-drawer-content";

interface IOrderViewProps {
    orderDetails: IOrders[];
    index: number;
    style: React.CSSProperties;
}

const StyledOrderNumber = styled(Typography)`
    && {
        background: #d7d6eb;
        width: fit-content;
        padding: 4px 8px;
        border-radius: 6px;
        color: #6e26fd;
        font-weight: 500;
    }
`;

const RelativePositionedFlexBox = styled(FlexBox)`
    position: relative;
`;

const MoreDetailsBtn = styled(IconButton)`
    &&{
        position: absolute;
        right: -0px;
        top: 28px;
    }
`;

const OrderPLaceholderIconWrapper = styled(FlexBox)`
    background-color: #f1f1f1;
    border-radius: 8px;
`;

const StyledOrder = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: 8px;
    height: fit-content;
    margin-bottom: 10px;
    padding: 10px 12px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #f1f2f4;
`;

export const TextFieldValue = styled(Typography)`
    &&{
        color: #68737d;
    }
`;

export const OrderItem = (props: IOrderViewProps) => {
    const { index, orderDetails } = props;
    const { orderNumber, financialStatus, fulfillmentStatus, currency, totalPrice } = orderDetails[index];
    const [showDrawer, setDrawerDisplay] = useState(false);

    const toggleOrderDetailsDrawer = () => {
        setDrawerDisplay((preValue) => !preValue);
    }

    return (
        <>
            <StyledOrder gap="10px">
                <OrderPLaceholderIconWrapper alignItems="center" padding="0 8px">
                    <ShoppingBagOutlined sx={{ width: '36px', height: '36px' }} />
                </OrderPLaceholderIconWrapper>
                <FlexBox width="calc(100% - 52px)">
                    <FlexBox flexDirection="column" gap="10px" width="50%" justifyContent="space-between">
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">Order Number:</Typography>
                            <StyledOrderNumber variant="subheading2" >{'#' + orderNumber}</StyledOrderNumber>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">Financial Status:</Typography>
                            <TextFieldValue variant="subheading2" >{financialStatus}</TextFieldValue>
                        </FlexBox>
                    </FlexBox>
                    <RelativePositionedFlexBox flexDirection="column" gap="10px" width="50%" justifyContent="space-between">
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">Price:</Typography>
                            <span>
                                {currency === 'INR' && <Typography variant="body2" display="inline" >&#8377;</Typography>}
                                <TextFieldValue variant="subheading2" display="inline" >{totalPrice}</TextFieldValue>
                            </span>
                        </FlexBox>
                        <Tooltip title="More details" arrow placement="left">
                            <MoreDetailsBtn onClick={toggleOrderDetailsDrawer}>
                                <ChevronRight />
                            </MoreDetailsBtn>
                        </Tooltip>
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">FulFillment Status:</Typography>
                            <TextFieldValue variant="subheading2" >{fulfillmentStatus ?? 'NA'}</TextFieldValue>
                        </FlexBox>
                    </RelativePositionedFlexBox>
                </FlexBox>
            </StyledOrder>
            <DrawerExtended
                anchor="right"
                width="420px"
                open={showDrawer}
                header={`Order #${orderNumber}`}
                onRenderContent={() => (
                    <OrderDetailsDrawerContent orderDetails={orderDetails[index]} />
                )}
                onClose={toggleOrderDetailsDrawer} />
        </>
    )
}