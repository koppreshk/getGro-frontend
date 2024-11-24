import { useMemo, useState } from "react";
import styled from "styled-components";
import { Typography, Avatar } from "@mui/material";
import { FlexBox, MoreActions } from "lib/ui-ux";
import { chooseRandomColors, getInitialsByName, getTimeAgo } from "lib/utils";
import { EmailPopoverMetadata } from "./email-popover-metadata";
import { DownloadAttachments } from "./download-attachments";
import { IEmailConversations } from "./email-conversations-layout";
import { CallSplit } from "@mui/icons-material";
import { SplitTicket } from "./more-actions/split-ticket";
import { useFeature } from "lib/hooks";

export interface IEmailCardProps {
    emailProps: IEmailConversations & { subject: string; };
    onSingleEmailCollapseHandler: (args: {
        messageId: string;
        isCollapsed: boolean;
    }) => void
}

const InnerHTML = styled.div`
    padding-left: 50px;
    @media print {
        padding: 0px;
    }
`;

const SubTextValue = styled(Typography)`
    &&{
        color: ${({ theme }) => theme.pallete.grayVariant3}
    }
`;

const StyledEmailCardContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.pallete.grayVariant1};
  padding-bottom: 20px;
`;

const StripedEmailContent = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

const StyledFlex = styled(FlexBox)`
    width: calc(100% - 50px);
    @media print {
        width: 100%;
    }
`;

const StyledMoreActions = styled(MoreActions)`
    &&{
        padding: 0;
    }
`;

function strip(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

enum EmailActionsEnum {
    splitTicket = 'splitTicket'
}

const useMenuItems = () => {
    const isFeatureAccessible = useFeature<undefined>();
    return [
        { key: EmailActionsEnum.splitTicket as string, label: 'Split Ticket', icon: <CallSplit />, hidden: !isFeatureAccessible('split_ticket') }
    ];
}

type DrawerDisplayTypes = {
    [key in EmailActionsEnum]: boolean;
}

interface MenuRendererProps extends Pick<IEmailCardProps, 'emailProps'> {
    selectedMenu?: string;
    showDrawer: DrawerDisplayTypes;
    toggleDrawerDisplay: (key: string) => void
}

const MenuRenderer = (props: MenuRendererProps) => {
    const { selectedMenu, showDrawer, emailProps, toggleDrawerDisplay } = props;

    switch (selectedMenu) {
        case 'splitTicket':
            return <SplitTicket emailProps={emailProps} showSplitTicketDrawer={showDrawer.splitTicket} onCloseDrawer={() => toggleDrawerDisplay('splitTicket')} />;
        default: return <></>
    }
}

export const EmailCard = (props: IEmailCardProps) => {
    const { emailProps: { htmlContent, from, fromEmail, createdAt, messageId, subject, toEmail, isCollapsed, attachments }, onSingleEmailCollapseHandler } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from || fromEmail)), [from, fromEmail]);
    const [selectedMenu, setSelectedMenu] = useState<string | undefined>();
    const [showDrawer, setDrawerDisplay] = useState<DrawerDisplayTypes>({
        splitTicket: false,
    });

    const toggleDrawerDisplay = (key: string) => {
        setDrawerDisplay((prev) => ({ ...prev, [key]: !prev[key as keyof DrawerDisplayTypes] }))
    }

    const onCardClick = () => onSingleEmailCollapseHandler({ messageId, isCollapsed: !isCollapsed });

    const onMenuItemSelect = (key: string) => {
        setSelectedMenu(key);
        toggleDrawerDisplay(key);
    }

    const menuItems = useMenuItems();

    return (
        <StyledEmailCardContainer className="email-card-container">
            <FlexBox flexDirection="column" gap="12px" justifyContent="center">
                <FlexBox style={{ cursor: 'pointer' }} flexDirection="column" width="100%" onClick={onCardClick}>
                    <FlexBox gap="10px" width="100%">
                        <Avatar className="no-print" sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from || fromEmail)}</Avatar>
                        <StyledFlex flexDirection="column">
                            <FlexBox justifyContent="space-between">
                                <Typography variant="h6">{from || fromEmail} <span className="print">{`<${fromEmail}>`}</span></Typography>
                                <FlexBox alignItems="center" gap="10px">
                                    <SubTextValue variant="caption">{(getTimeAgo(createdAt))}</SubTextValue>
                                    <StyledMoreActions onMenuItemSelect={onMenuItemSelect} menuItems={menuItems} />
                                </FlexBox>
                            </FlexBox>
                            {
                                isCollapsed
                                    ? <StripedEmailContent variant="body3">{strip(htmlContent)}</StripedEmailContent>
                                    : <FlexBox gap="4px" alignItems="center">
                                        <SubTextValue fontSize="12px">to {toEmail.split('@')[0]} <span className="print">{`<${toEmail}>`}</span></SubTextValue>
                                        <EmailPopoverMetadata fromEmail={fromEmail} toEmail={toEmail} subject={subject} createdAt={createdAt} />
                                    </FlexBox>
                            }
                        </StyledFlex>
                    </FlexBox>
                </FlexBox>
                {!isCollapsed && <InnerHTML dangerouslySetInnerHTML={{ __html: htmlContent }} />}
                {!isCollapsed && attachments.length > 0 && <DownloadAttachments attachments={attachments} messageId={messageId} />}
                <MenuRenderer emailProps={props.emailProps} selectedMenu={selectedMenu} showDrawer={showDrawer} toggleDrawerDisplay={toggleDrawerDisplay} />
            </FlexBox >
        </StyledEmailCardContainer>
    )
}