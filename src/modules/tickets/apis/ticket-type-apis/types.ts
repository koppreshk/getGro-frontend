
export interface ITicketDetails {
    customerName: string;
    ticketId: string;
    source: string;
    channelId: number;
    description: string;
    ticketStatus: string;
    priority: string;
    createdAt: string;
    pastTickets: ITicketDetails[];
    customerInfo?: {
        email: string;
        firstName: string;
        lastName: string;
        omsCustomerId: string;
        phoneNumber: string;
    }
    statusUpdateString: string;
    closedAt: null | string;
    responseDue: null | string;
    resolutionDue: string;
    assigneeInfo: {
        id: 1,
        first_name: string,
        last_name: string,
        email: string
    }
    tags: number[];
}
