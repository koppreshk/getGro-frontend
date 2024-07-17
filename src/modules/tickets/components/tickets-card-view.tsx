import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { ITicketDetails } from "../apis";
import { CardView } from "./card-view";

interface ITicketCardViewProps {
    data: ITicketDetails[];
    isLoading?: boolean;
    totalPages: number;
}

export const TicketsCardview = (props: ITicketCardViewProps) => {
    const { data, isLoading } = props;

    if (isLoading) return <CenteredCircularProgress />;

    return (
        <FlexBox flexDirection="column" gap={'10px'} padding="20px" style={{background: '#f1f1f1'}} overflowX="auto" height="100%">
            {data.map((item) => <CardView {...item} key={item.ticketId}/>)}
        </FlexBox>
    )
}
