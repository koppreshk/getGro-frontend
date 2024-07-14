import React from "react";
import { PersonSearch } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/material";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { Platform } from "../../ticket-conversation/ticket-conversation-header";
import { ManageAssigneeContainer, ManagePriorityContainer, SearchCustomerContainer, TicketStatusContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { UnlinkCustomer } from "./unlink-customer";
import { ITicketDetails } from "modules/tickets/apis";
import { ContactInfo, TypographyName } from "./contact-info";
import { Tags } from "./tags";
import { useDateDifference } from "lib/utils";

interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source, createdAt, ticketId, ticketStatus, priority, assigneeInfo, statusUpdateString, closedAt } = ticketDetails;
    const [showSearchUserFlyout, setShowSearchUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowSearchUserFlyout((x) => !x);
    }, []);
    const customerInfo = useAppSelector((state) => state.tickets.ticketDetails?.customerInfo)

    return (
        <FlexBox gap="20px" padding="10px" flexDirection="column" height="100%">
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
            <FlexBox gap={'20px'} flexDirection="column" height="calc(100% - 62px)" overflowY="auto">
                <ContactInfo customerInfo={customerInfo} createdAt={createdAt} closedAt={closedAt} ticketId={ticketId} customerName={customerName} />
                <FlexBox flexDirection="column" gap="10px">
                    <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={statusUpdateString} />
                    <ManageAssigneeContainer ticketId={ticketId} assigneeInfo={assigneeInfo} />
                    <ManagePriorityContainer priority={priority} ticketId={ticketId} />
                </FlexBox>
                <FlexBox padding="0px 20px" flexDirection="column" gap="10px">
                    {ticketDetails?.responseDue ? <DateInfo label="Response due: " date={ticketDetails.responseDue} /> : null}
                    {ticketDetails?.resolutionDue ? <DateInfo label="Resolution due: " date={ticketDetails.resolutionDue} /> : null}
                </FlexBox>
                <FlexBox>
                    <Tags />
                </FlexBox>
            </FlexBox>
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}

const DateInfo = (props: { label: string, date: string }) => {
    const { date, label } = props;

    const { parsedDateString, dateColor } = useDateDifference(date);

    return (
        <FlexBox flexDirection="column" gap={'5px'}>
            <TypographyName variant="h6">{label}</TypographyName>
            <Tooltip title={date}>
                <Chip label={parsedDateString} sx={{ borderRadius: '4px' }} color={dateColor as any} />
            </Tooltip>
        </FlexBox>
    )
}
