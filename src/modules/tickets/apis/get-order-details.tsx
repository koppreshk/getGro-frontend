import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export interface IOrders {
    id: number;
    adminGraphqlApiId: string;
    appId: number;
    browserIp: string;
    buyerAcceptsMarketing: boolean;
    cancelReason: null;
    cancelledAt: null;
    cartToken: null;
    checkoutId: number;
    checkoutToken: string;
    clientDetails: ClientDetails;
    closedAt: null;
    confirmationNumber: string;
    confirmed: boolean;
    contactEmail: string;
    createdAt: Date;
    currency: Currency;
    currentSubtotalPrice: string;
    currentSubtotalPriceSet: Set;
    currentTotalAdditionalFeesSet: null;
    currentTotalDiscounts: string;
    currentTotalDiscountsSet: Set;
    currentTotalDutiesSet: null;
    currentTotalPrice: string;
    currentTotalPriceSet: Set;
    currentTotalTax: string;
    currentTotalTaxSet: Set;
    customerLocale: string;
    deviceId: null;
    discountCodes: [];
    email: string;
    estimatedTaxes: boolean;
    financialStatus: string;
    fulfillmentStatus: string;
    landingSite: null;
    landingSiteRef: null;
    locationId: null;
    merchantOfRecordAppId: null;
    name: string;
    note: null;
    noteAttributes: [];
    number: number;
    orderNumber: number;
    orderStatusUrl: string;
    originalTotalAdditionalFeesSet: null;
    originalTotalDutiesSet: null;
    paymentGatewayNames: [];
    phone: string;
    poNumber: null;
    presentmentCurrency: Currency;
    processedAt: Date;
    reference: string;
    referringSite: null;
    sourceIdentifier: string;
    sourceName: string;
    sourceUrl: null;
    subtotalPrice: string;
    subtotalPriceSet: Set;
    tags: string;
    taxExempt: boolean;
    taxLines: [];
    taxesIncluded: boolean;
    test: boolean;
    token: string;
    totalDiscounts: string;
    totalDiscountsSet: Set;
    totalLineItemsPrice: string;
    totalLineItemsPriceSet: Set;
    totalOutstanding: string;
    totalPrice: string;
    totalPriceSet: Set;
    totalShippingPriceSet: Set;
    totalTax: string;
    totalTaxSet: Set;
    totalTipReceived: string;
    totalWeight: number;
    updatedAt: Date;
    userId: number;
    billingAddress: Address;
    customer: Customer;
    discountApplications: [];
    fulfillments: Fulfillment[];
    lineItems: LineItem[];
    paymentTerms: null;
    refunds: [];
    shippingAddress: Address;
    shippingLines: [];
}

export interface Address {
    firstName: string;
    address1: string;
    phone: null | string;
    city: string;
    zip: null | string;
    province: null | string;
    country: string;
    lastName: string;
    address2: null | string;
    company: null | string;
    latitude?: null;
    longitude?: null;
    name: string;
    countryCode: string;
    provinceCode: null;
    id?: number;
    customerId?: number;
    countryName?: string;
    default?: boolean;
}

export interface ClientDetails {
    acceptLanguage: null;
    browserHeight: null;
    browserIp: string;
    browserWidth: null;
    sessionHash: null;
    userAgent: string;
}

export enum Currency {
    Inr = "INR",
}

export interface Set {
    shopMoney: Money;
    presentmentMoney: Money;
}

export interface Money {
    amount: string;
    currencyCode: Currency;
}

export interface Customer {
    id: number;
    email: string;
    acceptsMarketing: boolean;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    state: string;
    note: string;
    verifiedEmail: boolean;
    multipassIdentifier: null;
    taxExempt: boolean;
    phone: string;
    emailMarketingConsent: MarketingConsent;
    smsMarketingConsent: MarketingConsent;
    tags: string;
    currency: Currency;
    acceptsMarketingUpdatedAt: Date;
    marketingOptInLevel: null;
    taxExemptions: [];
    adminGraphqlApiId: string;
    defaultAddress: Address;
}

export interface MarketingConsent {
    state: string;
    optInLevel: string;
    consentUpdatedAt: null;
    consentCollectedFrom?: string;
}

export interface Fulfillment {
    id: number;
    adminGraphqlApiId: string;
    createdAt: Date;
    locationId: number;
    name: string;
    orderId: number;
    originAddress: OriginAddress;
    receipt: OriginAddress;
    service: string;
    shipmentStatus: null;
    status: string;
    trackingCompany: string;
    trackingNumber: string;
    trackingNumbers: { [key: string]: string }[];
    trackingUrl: null;
    trackingUrls: [];
    updatedAt: Date;
    lineItems: LineItem[];
}

export interface LineItem {
    id: number;
    adminGraphqlApiId: string;
    attributedStaffs: [];
    fulfillableQuantity: number;
    fulfillmentService: string;
    fulfillmentStatus: string;
    giftCard: boolean;
    grams: number;
    name: string;
    price: string;
    priceSet: Set;
    productExists: boolean;
    productId: number;
    properties: [];
    quantity: number;
    requiresShipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    totalDiscount: string;
    totalDiscountSet: Set;
    variantId: number;
    variantInventoryManagement: string;
    variantTitle: null;
    vendor: string;
    taxLines: [];
    duties: [];
    discountAllocations: [];
}

export interface OriginAddress {
}

export interface IOrderDetails {
    orders: IOrders[]
}

export const useGetOrderDetails = (args: { customerId?: string }) => {
    const { customerId = '7021764280539' } = args;
    const { getData } = useServiceClient();

    const getOrderDetailsData = React.useCallback(() => getData(`${TicketsEndPoint.GET_USER_ORDERS}?customer_id=${customerId}`).then((res) => res.json()).catch((err) => err), [customerId, getData]);
    return useQuery<IOrderDetails>({
        queryKey: [TicketsQueryKey.GET_USER_ORDERS, customerId],
        queryFn: getOrderDetailsData
    });
}