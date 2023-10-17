import { FlexBox } from "lib/ui-ux"
import { TicketList, TicketListViewHeader } from "."
import { ITicketDetails } from "../../unsassigned-tickets";

interface ITicketListViewsProps {
    data: ITicketDetails[];
    isLoading?: boolean;
}

export const TicketListView = (props: ITicketListViewsProps) => {
    const { data } = props;
    console.log(data);

    return (
        <FlexBox $flexDirection="column" $width="100%">
            <TicketListViewHeader />
            <TicketList data={data}/>
        </FlexBox>
    )
}