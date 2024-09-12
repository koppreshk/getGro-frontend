import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { IconButton, Popover, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { IEmailConversations } from "./email-conversations-layout";
import { useTranslation } from "react-i18next";

interface IEmailPopoverMetadataProps extends Pick<IEmailConversations, 'createdAt' | 'fromEmail' | 'toEmail'> {
    subject: string
}
export const EmailPopoverMetadata = (props: IEmailPopoverMetadataProps) => {
    const { createdAt, fromEmail, subject, toEmail } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const popoverData = [
        { name: t('modules.tickets.ticketDetails.interactions.conversations.email.from'), value: fromEmail },
        { name: t('modules.tickets.ticketDetails.interactions.conversations.email.to'), value: toEmail },
        { name: t('modules.tickets.ticketDetails.interactions.conversations.email.subject'), value: subject },
        { name: t('modules.tickets.ticketDetails.interactions.conversations.email.date'), value: createdAt }];

    return (
        <div>
            <IconButton className="no-print" sx={{ width: '24px', height: '24px' }} onClick={handleClick}>
                <ArrowDropDown />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}>
                <FlexBox padding="12px" flexDirection="column" gap="4px">
                    {popoverData.map((item, index) => (
                        <FlexBox gap="8px" key={index} alignItems="center">
                            <Typography variant="h6">{item.name}: </Typography>
                            <Typography variant="body3">{item.value}</Typography>
                        </FlexBox>
                    ))}
                </FlexBox>
            </Popover>
        </div>
    )
}