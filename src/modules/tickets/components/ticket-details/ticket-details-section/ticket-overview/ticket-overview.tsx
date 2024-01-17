import { PersonSearch } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { Platform } from "../../ticket-conversation/ticket-conversation-header";
import { SearchCustomerContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { UnlinkCustomer } from "../unlink-customer";
import { ITicketDetails } from "modules/tickets/apis";
import React from "react";
import { ContactInfo } from "./contact-info";

interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source } = ticketDetails;
    const [showSearchUserFlyout, setShowSearchUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowSearchUserFlyout((x) => !x);
    }, []);
    const customerId = useAppSelector((state) => state.tickets.linkedCustomer.customerId)

    return (
        <FlexBox gap="30px" padding="10px" flexDirection="column">
            <FlexBox justifyContent="space-between">
                <FlexBox gap="5px" alignItems="center">
                    <Typography variant="h5" >{customerName}</Typography><Typography variant="body2"> messaged via</Typography>
                    <Platform variant="body2" $platform={source.toLocaleLowerCase()}>{source}</Platform>
                </FlexBox>
                {customerId
                    ? <UnlinkCustomer />
                    : <CustomIconButton tooltipProps={{ title: 'Search Customer', arrow: true, placement: "left" }} iconComponent={<PersonSearch />} onClick={onSearchUserBtnClick} />
                }
            </FlexBox>
            <ContactInfo defaultData={ticketDetails} />
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}
