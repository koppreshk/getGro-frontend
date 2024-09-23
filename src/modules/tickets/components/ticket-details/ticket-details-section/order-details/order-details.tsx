import React from "react"
import styled from "styled-components"
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { OrderItem } from "./order-item";
import { IOrders } from "modules/tickets/apis";
import { ExpandMore } from "@mui/icons-material";
import { commonStyles } from "lib/ui-ux/common-styles";

interface IOrderDetailsProps {
    orderDetails: IOrders[]
}

const OrderWrappers = styled(FlexBox)`
    padding: 10px;
`;

export const TypographyName = styled(Typography)`
    && {
        color: ${({ theme }) => theme.semantics.secondaryTextColor}
    }
`;

export const TypographyValue = styled(Typography)`
    && {
        ${commonStyles.textOverflow};
    }
`;

export const OrderDetails = React.memo((props: IOrderDetailsProps) => {
    const { orderDetails } = props;
    return (
        <>
            {orderDetails.length ?
                <OrderWrappers height="calc(100% - 134px)" gap="10px" flexDirection="column">
                    <CustomerDetails orderDetails={orderDetails} />
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

export const CustomerDetails = (props: IOrderDetailsProps) => {
    const { orderDetails } = props;
    const customerDetails = orderDetails[0].customer;
    return (
        <Accordion disableGutters sx={{ boxShadow: 'none', border: '1px solid #E9EBED', borderRadius: '8px' }}>
            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMore />}
                sx={{ background: '#f7f8f9', borderRadius: '8px' }}>
                Customer ID <Typography variant="h6">: {customerDetails.id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FlexBox gap="10px" flexDirection="column">
                    <NameValue heading="Name" value={`${customerDetails.first_name} ${customerDetails.last_name}`} />
                    <NameValue heading="Email" value={customerDetails.email} />
                    <NameValue heading="Phone" value={customerDetails.phone ? customerDetails.phone : 'NA'} />
                </FlexBox>
            </AccordionDetails>
        </Accordion>
    )
}

export const NameValue = (props: { heading: string, value: string }) => {
    return (
        <FlexBox width="100%" flexDirection="row" alignItems="center">
            <TypographyName variant="body2" width="30%" >{props.heading}</TypographyName>
            <TypographyValue variant="h6" width="70%"  >{props.value}</TypographyValue>
        </FlexBox>
    )
} 