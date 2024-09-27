import React, { useEffect, useRef, useState, forwardRef } from "react";
import styled from "styled-components";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { OrderItem } from "./order-item";
import { IOrders } from "modules/tickets/apis";
import { ExpandMore } from "@mui/icons-material";
import { commonStyles } from "lib/ui-ux/common-styles";

interface IOrderDetailsProps {
    orderDetails: IOrders[]
}

const OrderWrappers = styled.div`
    padding: 10px;
    height: calc(100% - 180px);
    overflow: hidden;
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

const ListContainer = styled.div<{ dynamicHeight: number }>`
    height: ${({ dynamicHeight }) => `calc(100% - ${dynamicHeight + 30}px)`};
    overflow-y: auto;
`;

export const OrderDetails = React.memo((props: IOrderDetailsProps) => {
    const { orderDetails } = props;
    const referenceComponentRef = useRef<HTMLDivElement>(null);
    const [dynamicHeight, setDynamicHeight] = useState(0);
    const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(false);

    const onAccordionChange = (_event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
        setIsAccordionExpanded(expanded);
    }

    useEffect(() => {
        const referenceElement = referenceComponentRef.current;
        if (!referenceElement) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDynamicHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(referenceElement);

        return () => resizeObserver.disconnect();
    }, [orderDetails, isAccordionExpanded]);

    return (
        <>
            {orderDetails.length ?
                <OrderWrappers>
                    <CustomerDetails
                        orderDetails={orderDetails}
                        onAccordionChange={onAccordionChange}
                        ref={referenceComponentRef}
                    />

                    <>
                        <Typography variant="h6" sx={{ paddingBottom: '5px' }}>Recent Orders</Typography>
                        <ListContainer dynamicHeight={dynamicHeight}>
                            {orderDetails.map((order, index) => (<OrderItem key={index} order={order} />))}
                        </ListContainer>
                    </>
                </OrderWrappers>
                :
                (
                    <FlexBox alignItems="center" justifyContent="center" height="100%">
                        <Typography>No orders found</Typography>
                    </FlexBox>
                )
            }
        </>
    )
});

interface ICustomerDetailsProps extends IOrderDetailsProps {
    onAccordionChange: (_event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void
}

export const CustomerDetails = forwardRef<HTMLDivElement, ICustomerDetailsProps>((props, ref) => {
    const { orderDetails, onAccordionChange } = props;
    const customerDetails = orderDetails[0].customer;

    return (
        <FlexBox width="100%" flexDirection="column" gap="5px" ref={ref} style={{ marginBottom: '20px' }}>
            <Typography variant="h6">Customer Details</Typography>
            <Accordion disableGutters sx={{ boxShadow: 'none', border: '1px solid #E9EBED', borderRadius: '8px' }} onChange={onAccordionChange}>
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
        </FlexBox>
    )
})

export const NameValue = (props: { heading: string, value: string }) => {
    return (
        <FlexBox width="100%" flexDirection="row" alignItems="center">
            <TypographyName variant="body2" width="30%" >{props.heading}</TypographyName>
            <TypographyValue variant="h6" width="70%"  >{props.value}</TypographyValue>
        </FlexBox>
    )
} 