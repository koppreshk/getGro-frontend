import { CircularProgress } from "@mui/material";
import { useGetOrderDetails } from "../apis";
import { OrderDetails } from "../components/ticket-details"
import { FlexBox } from "lib/ui-ux";

export const OrderDetailsContainer = () => {
    const { data, isLoading, error } = useGetOrderDetails({});

    if (isLoading) {
        return (
            <FlexBox $alignItems="center" $justifyContent="center">
                <CircularProgress />
            </FlexBox>
        )
    }

    if (data) {
        return (
            <>
                <OrderDetails />
            </>
        )
    }

    return <span>Error: {error as string}</span>
}