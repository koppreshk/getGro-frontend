import React from "react"
import styled from "styled-components"
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { IOrders } from "modules/tickets/apis";
import { CommonHeader } from "../common-header";
import { OrderItem } from "./order-item";

interface IOrderDetailsProps {
    orderDetails: IOrders[]
}

const OrderWrappers = styled(FlexBox)`
    padding: 10px;
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
                                    <OrderItem index={index} style={style} orderDetails={orderDetails} />
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