
export interface ITicketDetails {
    customerName: string;
    ticketId: string;
    source: string;
    channelId: number;
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
    responseDue: null | string;
    resolutionDue: string;
    assigneeInfo: {
        id: 1,
        first_name: string,
        last_name: string,
        email: string
    }
}
