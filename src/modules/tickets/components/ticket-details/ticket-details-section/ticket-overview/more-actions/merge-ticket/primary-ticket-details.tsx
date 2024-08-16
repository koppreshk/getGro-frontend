import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { SearchTickets } from "./search-ticket";
import { TicketInfo } from "./ticket-info";
import { ISearchTickets, ITicketDetails } from "modules/tickets/apis";

export interface IPrimaryTicketDetailsProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    data: ISearchTickets | undefined;
    isLoading: boolean;
    ticketDetails: Pick<ITicketDetails, 'description' | 'ticketStatus' | 'customerName' | 'ticketId'>;

}
export const PrimaryTicketDetails = (props: IPrimaryTicketDetailsProps) => {
    const { data, isLoading, onChange, ticketDetails } = props;

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <TicketInfo ticketDetails={ticketDetails} isPrimary />
            <HorizontalSeparator />
            <SearchTickets data={data} isLoading={isLoading} onChange={onChange} />
        </FlexBox>
    )
}