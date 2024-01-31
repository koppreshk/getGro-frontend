import React from "react";
import { PersonSearch } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { Platform } from "../../ticket-conversation/ticket-conversation-header";
import { SearchCustomerContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { UnlinkCustomer } from "./unlink-customer";
import { ITicketDetails } from "modules/tickets/apis";
import { ContactInfo } from "./contact-info";

interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source, createdAt, ticketId, ticketStatus, priority } = ticketDetails;
    const [showSearchUserFlyout, setShowSearchUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowSearchUserFlyout((x) => !x);
    }, []);
    const customerInfo = useAppSelector((state) => state.tickets.ticketDetails?.customerInfo)

    return (
        <FlexBox gap="30px" padding="10px" flexDirection="column" height="100%" overflowY="auto">
            <FlexBox justifyContent="space-between">
                <FlexBox flexDirection="column" maxWidth="calc(100% - 50px)">
                    <Typography variant="h5" >{customerName}</Typography>
                    <FlexBox gap="5px" >
                        <Typography variant="body3"> messaged via</Typography>
                        <Platform variant="body3" $platform={source.toLocaleLowerCase()}>{source}</Platform>
                    </FlexBox>
                </FlexBox>
                {customerInfo?.omsCustomerId
                    ? <UnlinkCustomer ticketId={ticketId} />
                    : <CustomIconButton tooltipProps={{ title: 'Search Customer', arrow: true, placement: "left" }} iconComponent={<PersonSearch />} onClick={onSearchUserBtnClick} />
                }
            </FlexBox>
            <ContactInfo customerInfo={customerInfo} createdAt={createdAt} ticketId={ticketId} ticketStatus={ticketStatus} priority={priority} customerName={customerName} />
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}
