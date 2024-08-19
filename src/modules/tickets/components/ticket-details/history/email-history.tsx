import { Avatar, Typography } from "@mui/material";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { useMemo } from "react";
import { useTheme } from "styled-components";

export const EmailHistory = () => {
    const history = [{ name: 'System Automation', content: 'SLA Violated - First Response Due' }, { name: 'System Automation', content: 'SLA Violated - First Response Due' }];

    return (
        <FlexBox renderSeparator={() => <HorizontalSeparator />} flexDirection="column" gap={'10px'}>
            {history.map((item, index) => <EmailHistoryCard key={index} name={item.name} content={item.content} />)}
        </FlexBox>
    )
}

interface EmailHistoryCardProps {
    name: string;
    content: string
}

const EmailHistoryCard = (props: EmailHistoryCardProps) => {
    const { name, content } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(name)), [name]);
    const { pallete } = useTheme();
    return (
        <FlexBox gap={'10px'}>
            <Avatar sx={{
                color: textColor,
                bgcolor: backgroundColor,
                width: '32px',
                height: '32px',
                fontSize: '13px',
                fontWeight: 500
            }}>
                {getInitialsByName(name)}
            </Avatar>
            <FlexBox flexDirection="column" gap={'20px'}>
                <FlexBox gap={'10px'} alignItems="center">
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>made changes - 20 hrs ago</Typography>
                </FlexBox>
                <Typography variant="body2">{content}</Typography>
            </FlexBox>
        </FlexBox>
    )
}