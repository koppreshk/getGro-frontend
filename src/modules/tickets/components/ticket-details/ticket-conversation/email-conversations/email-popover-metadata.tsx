import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { IconButton, Popover, Typography } from "@mui/material";
import { IEmailThreadProps } from "./email-card";
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate } from "lib/utils";

interface IEmailPopoverMetadataProps extends Pick<IEmailThreadProps, 'createdDate' | 'fromEmail' | 'toEmail' | 'subject'> {

}
export const EmailPopoverMetadata = (props: IEmailPopoverMetadataProps) => {
    const { createdDate, fromEmail, subject, toEmail } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const popoverData = [{ name: 'From', value: fromEmail }, { name: 'To', value: toEmail },
    { name: 'Subject', value: subject }, { name: 'Date', value: getFormattedDate(createdDate) }];

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
                <FlexBox $padding="12px" $flexDirection="column" $gap="4px">
                    {popoverData.map((item, index) => (
                        <FlexBox $gap="8px" key={index} $alignItems="center">
                            <Typography variant="h6" fontSize="16px">{item.name}: </Typography>
                            <Typography fontSize="14px">{item.value}</Typography>
                        </FlexBox>
                    ))}
                </FlexBox>
            </Popover>
        </div>
    )
}