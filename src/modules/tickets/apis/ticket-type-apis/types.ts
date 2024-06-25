
export interface ITicketDetails {
    source: string;
    channelId: number;
    ticketId: string;
    customerName: string;
    ticketStatus: string;
    createdAt: string;
    priority: string;
    status: boolean;
    pastTickets: ITicketDetails[];
    customerInfo?: {
        email: string;
        firstName: string;
        lastName: string;
        omsCustomerId: string;
        phoneNumber: string;
    }
}
