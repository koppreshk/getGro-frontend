import { CircularProgress } from "@mui/material";
import { useGetOrderDetails } from "../apis";
import { OrderDetails } from "../components/ticket-details"
import { FlexBox } from "lib/ui-ux";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import { useAppSelector } from "lib/hooks";

export const OrderDetailsContainer = () => {
    const customerId = useAppSelector((state) => state.tickets.linkedCustomer.customerId)
    const { data, isLoading, error } = useGetOrderDetails(customerId);

    if (isLoading) {
        return (
            <FlexBox $alignItems="center" $justifyContent="center" $height="100%" $width="100%">
                <CircularProgress />
            </FlexBox>
        )
    }

    if (data) {
        const casedData = data.orders.map((item) => toCamelCasedKeysFromUnderScores(item));
        return (
            <>
                <OrderDetails orderDetails={casedData} />
            </>
        )
    }

    return <span>Error: {error as string}</span>
}