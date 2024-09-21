import { useState } from "react";
import { DeleteOutlined, MergeOutlined, ReportOutlined } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/material";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { Platform } from "../../ticket-conversation/ticket-conversation-header";
import { ManageAssigneeContainer, ManagePriorityContainer, TicketStatusContainer, ManageTagsContainer } from "modules/tickets/containers";
import { useAppSelector, useFeature } from "lib/hooks";
import { ITicketDetails } from "modules/tickets/apis";
import { ContactInfo, TypographyName } from "./contact-info";
import { useDateDifference } from "lib/utils";
import { MoreActions } from "./more-actions";
import { MergeTicket } from "./more-actions/merge-ticket/merge-ticket";
import { DeleteTicket } from "./more-actions/delete-ticket/delete-ticket";
import { SpamTicket } from "./more-actions/spam-ticket/spam-ticket";

interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

interface MenuRendererProps {
    selectedMenu?: string;
    showDrawer: DrawerDisplayTypes;
    toggleDrawerDisplay: (key: string) => void
}

const MenuRenderer = (props: MenuRendererProps) => {
    const { selectedMenu, showDrawer, toggleDrawerDisplay } = props;

    switch (selectedMenu) {
        case 'mergeTicket':
            return <MergeTicket showMergeTicketDrawer={showDrawer.mergeTicket} onCloseDrawer={() => toggleDrawerDisplay('mergeTicket')} />;
        case 'deleteTicket':
            return <DeleteTicket showDialog={showDrawer.deleteTicket} onCloseDrawer={() => toggleDrawerDisplay('deleteTicket')} />
        case 'spamTicket':
            return <SpamTicket showDialog={showDrawer.spamTicket} onCloseDrawer={() => toggleDrawerDisplay('spamTicket')} />
        default: return <></>
    }
}

enum MoreActionsEnum {
    mergeTicket = 'mergeTicket',
    deleteTicket = 'deleteTicket',
    spamTicket = 'spamTicket'
}

type DrawerDisplayTypes = {
    [key in MoreActionsEnum]: boolean;
}

const useMenuItems = () => {
    const isFeatureAccessible = useFeature<undefined>();
    return [
        { key: MoreActionsEnum.mergeTicket as string, label: 'Merge Ticket', icon: <MergeOutlined />, hidden: !isFeatureAccessible('MERGE_TICKET') },
        { key: MoreActionsEnum.deleteTicket as string, label: 'Delete Ticket', icon: <DeleteOutlined /> },
        { key: MoreActionsEnum.spamTicket as string, label: 'Mark as Spam', icon: <ReportOutlined /> },
    ];

}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source, createdAt, ticketId, ticketStatus, priority, assigneeInfo, statusUpdateString, closedAt, tags } = ticketDetails;
    const customerInfo = useAppSelector((state) => state.tickets.ticketDetails?.customerInfo)
    const [selectedMenu, setSelectedMenu] = useState<string | undefined>();
    const [showDrawer, setDrawerDisplay] = useState<DrawerDisplayTypes>({
        mergeTicket: false,
        deleteTicket: false,
        spamTicket: false
    });

    const toggleDrawerDisplay = (key: string) => {
        setDrawerDisplay((prev) => ({ ...prev, [key]: !prev[key as keyof DrawerDisplayTypes] }))
    }

    const onMenuItemSelect = (key: string) => {
        setSelectedMenu(key);
        toggleDrawerDisplay(key)
    }

    const menuItems = useMenuItems();
    const isFeatureAccessible = useFeature<undefined>();

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
                <FlexBox>
                    <MoreActions onMenuItemSelect={onMenuItemSelect} menuItems={menuItems} />
                </FlexBox>
            </FlexBox>
            <FlexBox gap={'20px'} flexDirection="column" height="calc(100% - 62px)" overflowY="auto">
                <ContactInfo customerInfo={customerInfo} createdAt={createdAt} closedAt={closedAt} ticketId={ticketId} customerName={customerName} />
                <FlexBox flexDirection="column" gap="10px">
                    {isFeatureAccessible('EDIT_STATUS') ? <TicketStatusContainer ticketStatus={ticketStatus} ticketId={ticketId} statusUpdateString={statusUpdateString} /> : null}
                    {isFeatureAccessible('EDIT_ASSIGNEE') ? <ManageAssigneeContainer ticketId={ticketId} assigneeInfo={assigneeInfo} /> : null}
                    {isFeatureAccessible('EDIT_PRIORITY') ? <ManagePriorityContainer priority={priority} ticketId={ticketId} /> : null}
                    {isFeatureAccessible('EDIT_TAGS') ? <ManageTagsContainer ticketId={ticketId} tags={tags} /> : null}
                    <HorizontalSeparator $margin="10px 0px 0px 0px" />
                </FlexBox>
                {ticketDetails?.responseDue || ticketDetails?.resolutionDue ?
                    <FlexBox padding="0px 20px" flexDirection="column" gap="10px">
                        {ticketDetails?.responseDue ? <DateInfo label="Response due: " date={ticketDetails.responseDue} /> : null}
                        {ticketDetails?.resolutionDue ? <DateInfo label="Resolution due: " date={ticketDetails.resolutionDue} /> : null}
                    </FlexBox> : null}
            </FlexBox>
            <MenuRenderer selectedMenu={selectedMenu} showDrawer={showDrawer} toggleDrawerDisplay={toggleDrawerDisplay} />
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
                <Chip label={parsedDateString} sx={{ borderRadius: '4px' }} color={dateColor} />
            </Tooltip>
        </FlexBox>
    )
}
