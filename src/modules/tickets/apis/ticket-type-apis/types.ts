
export interface ITicketDetails {
    customerName: string;
    ticketId: number;
    source: string;
    channelId: number;
    description: string;
    ticketStatus: string;
    priority: string;
    createdAt: string;
    pastTickets: ITicketDetails[];
    customerInfo?: {
        email: string;
        name: string;
        phone_number: string;
    }
    statusUpdateString: string;
    closedAt?: string;
    responseDue: null | string;
    resolutionDue: string;
    assigneeInfo?: {
        id: 1,
        first_name: string,
        last_name: string,
        email: string
    }
    tags: number[];
    shopifyCustomerId: null | string;
}
