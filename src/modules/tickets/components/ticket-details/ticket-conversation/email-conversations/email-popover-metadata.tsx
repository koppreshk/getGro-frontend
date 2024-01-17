import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { IconButton, Popover, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate } from "lib/utils";
import { IEmailConversations } from "./email-conversations-layout";

interface IEmailPopoverMetadataProps extends Pick<IEmailConversations, 'createdAt' | 'fromEmail' | 'toEmail'> {
    subject: string
}
export const EmailPopoverMetadata = (props: IEmailPopoverMetadataProps) => {
    const { createdAt, fromEmail, subject, toEmail } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const popoverData = [{ name: 'From', value: fromEmail }, { name: 'To', value: toEmail },
    { name: 'Subject', value: subject }, { name: 'Date', value: getFormattedDate(createdAt) }];

    return (
        <div>
            <IconButton sx={{ width: '24px', height: '24px' }} onClick={handleClick}>
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