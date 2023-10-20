import { Skeleton } from "@mui/material";
import { useGetUnassignedTickets } from "../apis";
import { TicketListView } from "../components/ticket-details/ticket-list-view"
import { FlexBox } from "lib/ui-ux";

export const TicketListViewContainer = () => {
    const { data, isLoading } = useGetUnassignedTickets();

    if (isLoading) {
        const skeletonLoading = Array(10).fill({}).map((i) =>
            <FlexBox $gap="10px" $height="100px" key={i}>
                <FlexBox $width="60px" $justifyContent="center" $alignItems="center">
                    <Skeleton variant="circular" width={40} height={40} />
                </FlexBox>
                <FlexBox $gap="8px" $flexDirection="column" $width="calc(100% - 80px)">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </FlexBox>
            </FlexBox>);
        return (
            <FlexBox $flexDirection="column" $width="100%">
                {skeletonLoading}
            </FlexBox>
        )
    }

    if (data) {
        console.log('data in container', data);
        return (
            <TicketListView data={data} />
        )
    }

    return (
        <h6>error</h6>
    );

}