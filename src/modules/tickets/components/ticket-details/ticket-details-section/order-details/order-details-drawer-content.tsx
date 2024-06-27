import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { getFormatedNumberByLocale } from "lib/utils";
import { IOrders } from "modules/tickets/apis";
import { TextFieldValue } from "./order-item";

export const OrderDetailsDrawerContent = (props: { orderDetails: IOrders }) => {
    const { createdAt, shippingAddress, lineItems, totalTax, totalDiscounts, totalPrice, paymentGatewayNames } = props.orderDetails;

    return (
        <FlexBox flexDirection="column" padding="20px" gap="10px">
            <HeaderValue heading="Order placed on:" value={createdAt} />
            {shippingAddress !== null
                ? <HeaderValue heading="Shipping Address:"
                    value={
                        [shippingAddress.address1, shippingAddress.address2, shippingAddress.city
                            , shippingAddress.country, shippingAddress.zip].filter((item) => item).join(', ')
                    } />
                : null}
            <HeaderValue heading="Payment mode:" value={paymentGatewayNames.join(',')} />
            <FlexBox flexDirection="column">
                <Typography variant="h6">Items:</Typography>
                <FlexBox style={{ border: '1px solid #f1f2f4' }} flexDirection="column" gap="10px" padding="10px">
                    {lineItems.map((item, idx) => (
                        <FlexBox width="100%" key={idx} justifyContent="space-between">
                            <Typography variant="subheading1">{item.name}</Typography>
                            <FlexBox gap="15px">
                                <Typography variant="subheading2">
                                    {item.quantity} <span style={{ fontFamily: 'Arial' }}>&#215;</span> <CurrencyINR />{getFormatedNumberByLocale(item.price)}
                                </Typography>
                                <Typography variant="subheading2">
                                    <CurrencyINR />{getFormatedNumberByLocale(item.quantity * Math.abs(Number(item.price)))}
                                </Typography>
                            </FlexBox>
                        </FlexBox>
                    ))}
                    <FlexBox justifyContent="space-between">
                        <Typography variant="subheading2">{'Discount'}</Typography>
                        <Typography variant="subheading2" color="#388e3c">
                            -<CurrencyINR />{getFormatedNumberByLocale(totalDiscounts)}
                        </Typography>
                    </FlexBox>
                    <FlexBox justifyContent="space-between">
                        <Typography variant="subheading2">{'Tax'}</Typography>
                        <Typography variant="subheading2">
                            <CurrencyINR />{getFormatedNumberByLocale(totalTax)}
                        </Typography>
                    </FlexBox>
                </FlexBox>
                <FlexBox justifyContent="space-between" padding="10px" style={{ background: '#f1f2f3' }}>
                    <Typography variant="subheading2">{'Total'}</Typography>
                    <Typography variant="subheading1">
                        <CurrencyINR />{getFormatedNumberByLocale(totalPrice)}
                    </Typography>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export const CurrencyINR = () => <span style={{ fontFamily: 'Arial' }}>&#x20B9;</span>

export const HeaderValue = (props: { heading: string, value: string }) => {
    return (
        <>
            <FlexBox flexDirection="column">
                <Typography variant="h6">{props.heading}</Typography>
                <TextFieldValue variant="subheading2" >{props.value}</TextFieldValue>
            </FlexBox>
        </>
    )
} 