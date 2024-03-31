export enum TicketsEndPoint {
    FETCH_ALL_TICKETS = 'fetch_all_tickets',
    FETCH_ALL_ASSIGNED = 'fetch_all_assigned',
    FETCH_ALL_UNASSIGNED = 'fetch_all_unassigned_tickets',
    GET_USER_ORDERS = 'fetch_user_orders',
    GET_CUSTOMER_DETAILS = 'fetch_user_details',
    FETCH_TICKET_BY_ID = 'fetch_ticket_by_id',
    REPLY_TO_EMAIL = 'reply_to_email',
    FETCH_ATTACHMENT = 'fetch_attachment',
    DISPOSE_TICKET = 'dispose_ticket',
    GET_CREATED_BY_ME_TICKETS = 'fetch_manual_tickets_by_user',
    ATTACH_CUSTOMER = 'attach_customer_to_ticket',
    UNLINK_CUSTOMER = 'unlink_customer_from_ticket',
    FETCH_ALL_COMPLETED_TICKETS = 'fetch_all_completed_tickets',
    FETCH_ALL_PENDING_TICKETS = 'fetch_all_pending_tickets',
    FETCH_ALL_WHATSAPP_MESSAGES = 'fetch_whatsapp_messages_by_ticket_id'
}

export enum TicketsQueryKey {
    FETCH_ALL_TICKETS = 'FETCH_ALL_TICKETS',
    FETCH_ALL_ASSIGNED = 'FETCH_ALL_ASSIGNED',
    FETCH_ALL_UNASSIGNED = 'FETCH_ALL_UNASSIGNED',
    GET_USER_ORDERS = 'GET_USER_ORDERS',
    GET_CUSTOMER_DETAILS = 'GET_CUSTOMER_DETAILS',
    FETCH_TICKET_BY_ID = 'FETCH_TICKET_BY_ID',
    REPLY_TO_EMAIL = 'REPLY_TO_EMAIL',
    FETCH_ATTACHMENT = 'FETCH_ATTACHMENT',
    DISPOSE_TICKET = 'DISPOSE_TICKET',
    GET_CREATED_BY_ME_TICKETS = 'GET_CREATED_BY_ME_TICKETS',
    ATTACH_CUSTOMER = 'ATTACH_CUSTOMER',
    UNLINK_CUSTOMER = 'UNLINK_CUSTOMER',
    FETCH_ALL_COMPLETED_TICKETS = 'FETCH_ALL_COMPLETED_TICKETS',
    FETCH_ALL_PENDING_TICKETS = 'FETCH_ALL_PENDING_TICKETS',
    FETCH_ALL_WHATSAPP_MESSAGES = 'FETCH_ALL_WHATSAPP_MESSAGES'
}