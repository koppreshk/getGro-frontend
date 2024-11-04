import React from "react";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { Chat, History } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { ChatDetails } from "./chat-details";

export const ChatDetailsLayout = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const renderByvalue = () => {
        switch (value) {
            case 0:
                return <ChatDetails />;
            default: return null;
        }
    }

    return (
        <FlexBox flexDirection="column" width="100%" padding="8px 0 0 0">
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label="Chat Details" icon={<Chat />} />
                <BottomNavigationAction label="History" icon={<History />} />
            </BottomNavigation>
            <HorizontalSeparator />
            <FlexBox flexDirection="column">
                {renderByvalue()}
            </FlexBox>
        </FlexBox>
    )
}