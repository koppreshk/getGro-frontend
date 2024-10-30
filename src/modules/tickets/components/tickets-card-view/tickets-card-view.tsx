import { FlexBox, NoDataIllustration } from "lib/ui-ux";
import { ITicketDetails } from "../../apis";
import { CardView } from "./card-view";
import { TicketsCardViewLoader } from "lib/ui-ux/loader-components";

interface ITicketCardViewProps {
    data: ITicketDetails[];
    isLoading?: boolean;
    totalPages: number;
}

export const TicketsCardview = (props: ITicketCardViewProps) => {
    const { data, isLoading } = props;

    if (isLoading) return <TicketsCardViewLoader />;

    return (
        <>
            {data.length > 0
                ?
                <FlexBox flexDirection="column" gap={'20px'} overflowY="auto" height="100%">
                    {data.map((item) => <CardView {...item} key={item.ticketId} />)}
                </FlexBox>
                : <NoDataIllustration message="No tickets to display" />}
        </>
    )
}
