import { FlexBox } from "lib/ui-ux"
import { TicketList, TicketListViewHeader } from "."
import { ITicketDetails } from "modules/tickets/apis";

interface ITicketListViewsProps {
    data: ITicketDetails[];
    isLoading?: boolean;
}

export const TicketListView = (props: ITicketListViewsProps) => {
    const { data } = props;

    return (
        <FlexBox $flexDirection="column" $width="100%" style={{ backgroundColor: '#fff' }}>
            <TicketListViewHeader />
            <TicketList data={data} />
        </FlexBox>
    )
}