export interface ITicketDetails {
  customerName?: string;
  customerNumber?: string;
  ticketId: number;
  source: string;
  channelId: number;
  description: string;
  subject: string;
  resolution: string;
  ticketStatus: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  createdFrom: string;
  has_read: boolean;
  customerInfo?: {
    email: string;
    name: string;
    phone_number: string;
  };
  statusUpdateString: string;
  closedAt?: string;
  responseDue: null | string;
  resolutionDue: string;
  assigneeInfo?: {
    id: 1;
    first_name: string;
    last_name: string;
    email: string;
  };
  tags: number[];
  departmentId?: number;
  shopifyCustomerId: null | string;
}
