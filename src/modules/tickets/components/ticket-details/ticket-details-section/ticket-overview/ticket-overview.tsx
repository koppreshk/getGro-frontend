import React from "react";
import { PersonSearch } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { Platform } from "../../ticket-conversation/ticket-conversation-header";
import { ManageAssigneeContainer, SearchCustomerContainer, TicketStatusContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { UnlinkCustomer } from "./unlink-customer";
import { ITicketDetails } from "modules/tickets/apis";
import { ContactInfo, TypographyName, TypographyValue } from "./contact-info";
import { DateTime } from "luxon";

interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source, createdAt, ticketId, ticketStatus, priority, assigneeInfo } = ticketDetails;
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
            <FlexBox gap={'20px'} flexDirection="column">
                <ContactInfo customerInfo={customerInfo} createdAt={createdAt} ticketId={ticketId} priority={priority} customerName={customerName} />
                <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} />
                <ManageAssigneeContainer ticketId={ticketId} assigneeInfo={assigneeInfo} />
                <FlexBox padding="0px 20px" flexDirection="column" gap="10px">
                    {ticketDetails?.responseDue ? <DateInfo label="Response due: " date={ticketDetails.responseDue} /> : null}
                    {ticketDetails?.resolutionDue ? <DateInfo label="Resolution due: " date={ticketDetails.resolutionDue} /> : null}
                </FlexBox>
            </FlexBox>
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}

const DateInfo = (props: { label: string, date: string }) => {
    const { date, label } = props;

    const parsedDate = DateTime.fromFormat(date, 'yyyy-MM-dd hh:mm a');
    const diff = parsedDate.diffNow();

    const { days, hours, minutes } = diff.shiftTo('days', 'hours', 'minutes').toObject();

    const outputString = days ? `in ${days} days, ${hours} hours and ${Math.round(minutes)} minutes` : `in ${hours} hours and ${Math.round(minutes)} minutes`;

    return (
        <FlexBox flexDirection="column">
            <TypographyName variant="h6">{label}</TypographyName>
            <Tooltip title={date}>
                <TypographyValue variant="body3">{outputString}</TypographyValue>
            </Tooltip>
        </FlexBox>
    )
}
