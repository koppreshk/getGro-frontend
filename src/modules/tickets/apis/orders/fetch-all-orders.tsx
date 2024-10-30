import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib"
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";


export interface IOrders {
    id: number;
    admin_graphql_api_id: string;
    app_id: number;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: string | null;
    cancelled_at: string | null;
    cart_token: string;
    checkout_id: number;
    checkout_token: string;
    client_details: ClientDetails;
    closed_at: string | null;
    confirmation_number: string;
    confirmed: boolean;
    contact_email: string;
    created_at: string;
    currency: string;
    current_subtotal_price: string;
    current_subtotal_price_set: MoneySet;
    current_total_additional_fees_set: null;
    current_total_discounts: string;
    current_total_discounts_set: MoneySet;
    current_total_duties_set: null;
    current_total_price: string;
    current_total_price_set: MoneySet;
    current_total_tax: string;
    current_total_tax_set: MoneySet;
    customer_locale: string;
    device_id: null;
    discount_codes: string[];
    email: string;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillment_status: string | null;
    landing_site: string;
    landing_site_ref: string | null;
    location_id: number | null;
    merchant_of_record_app_id: number | null;
    name: string;
    note: string | null;
    note_attributes: [];
    number: number;
    order_number: number;
    order_status_url: string;
    original_total_additional_fees_set: null;
    original_total_duties_set: null;
    payment_gateway_names: string[];
    phone: string | null;
    po_number: string | null;
    presentment_currency: string;
    processed_at: string;
    reference: string;
    referring_site: string;
    source_identifier: string;
    source_name: string;
    source_url: string | null;
    subtotal_price: string;
    subtotal_price_set: MoneySet;
    tags: string;
    tax_exempt: boolean;
    tax_lines: TaxLine[];
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: MoneySet;
    total_line_items_price: string;
    total_line_items_price_set: MoneySet;
    total_outstanding: string;
    total_price: string;
    total_price_set: MoneySet;
    total_shipping_price_set: MoneySet;
    total_tax: string;
    total_tax_set: MoneySet;
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: number | null;
    billing_address: Address;
    customer: Customer;
    discount_applications: [];
    fulfillments: [];
    line_items: LineItem[];
    payment_terms: null;
    refunds: [];
    shipping_address: Address;
    shipping_lines: ShippingLine[];
}

export interface ClientDetails {
    accept_language: string;
    browser_height: number | null;
    browser_ip: string;
    browser_width: number | null;
    session_hash: string | null;
    user_agent: string;
}

export interface MoneySet {
    shop_money: Money;
    presentment_money: Money;
}

export interface Money {
    amount: string;
    currency_code: string;
}

export interface Address {
    first_name: string | null;
    address1: string;
    phone: string | null;
    city: string;
    zip: string;
    province: string;
    country: string;
    last_name: string;
    address2: string | null;
    company: string | null;
    latitude: number | null;
    longitude: number | null;
    name: string;
    country_code: string;
    province_code: string;
}

export interface Customer {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    state: string;
    note: string | null;
    verified_email: boolean;
    multipass_identifier: string | null;
    tax_exempt: boolean;
    phone: string | null;
    email_marketing_consent: MarketingConsent;
    sms_marketing_consent: string | null;
    tags: string;
    currency: string;
    tax_exemptions: [];
    admin_graphql_api_id: string;
    default_address: Address;
}

export interface MarketingConsent {
    state: string;
    opt_in_level: string;
    consent_updated_at: string | null;
}

export interface LineItem {
    id: number;
    admin_graphql_api_id: string;
    attributed_staffs: [];
    current_quantity: number;
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: string | null;
    gift_card: boolean;
    grams: number;
    name: string;
    price: string;
    price_set: MoneySet;
    product_exists: boolean;
    product_id: number;
    properties: [];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: MoneySet;
    variant_id: number;
    variant_inventory_management: string;
    variant_title: string | null;
    vendor: string;
    tax_lines: TaxLine[];
    duties: [];
    discount_allocations: [];
}

export interface TaxLine {
    channel_liable: boolean;
    price: string;
    price_set: MoneySet;
    rate: number;
    title: string;
}

export interface ShippingLine {
    id: number;
    carrier_identifier: string;
    code: string;
    discounted_price: string;
    discounted_price_set: MoneySet;
    is_removed: boolean;
    phone: string | null;
    price: string;
    price_set: MoneySet;
    requested_fulfillment_service_id: number | null;
    source: string;
    title: string;
    tax_lines: [];
    discount_allocations: [];
}

export const useFetchAllOrders = (storeId: number | null, customerId: string) => {
    const { getData } = useServiceClient();

    const fetchALLOrders = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_ALL_ORDERS}?store_id=${storeId}&customer_id=${customerId}`)
        .then((res) => res.json()), [customerId, getData, storeId]);

    return useQuery<IOrders[]>({
        queryFn: fetchALLOrders,
        queryKey: [TicketsQueryKey.FETCH_ALL_ORDERS, storeId, customerId],
        enabled: storeId && customerId ? true : false
    })
}