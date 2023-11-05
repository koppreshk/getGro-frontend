import { Skeleton } from "@mui/material";
import { TicketListView } from "../components/ticket-details/ticket-list-view"
import { FlexBox } from "lib/ui-ux";
import { useGetUnassignedTickets } from "../apis";
import { useAppSelector } from "lib/hooks";

export const TicketListViewContainer = () => {
    const { itemsPerPage, pageNumber } = useAppSelector((state) => state.tickets);
    const { data, isLoading } = useGetUnassignedTickets({ itemsPerPage: itemsPerPage.toString(), pageNumber: pageNumber.toString() });

    if (isLoading) {
        const skeletonLoading = Array(10).fill({}).map((_item, index) =>
            <FlexBox $gap="10px" $height="100px" key={index}>
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
        return (
            <TicketListView data={data.data} />
        )
    }

    return (
        <h6>error</h6>
    );

}