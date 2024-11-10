import React from "react";
import { useTranslation } from "react-i18next";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { Chat, History } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { ChatDetails } from "./chat-details";
import { ChatHistory } from "./chat-history";

export const ChatDetailsLayout = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const { t } = useTranslation();

    const renderByvalue = () => {
        switch (value) {
            case 0:
                return <ChatDetails />;
            case 1:
                return <ChatHistory />;
            default: return null;
        }
    }

    return (
        <FlexBox flexDirection="column" width="100%" padding="8px 0px 16px 0">
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label={t('chat_details')} icon={<Chat />} />
                < BottomNavigationAction label={t('history')} icon={< History />} />
            </BottomNavigation>
            <HorizontalSeparator />
            <FlexBox flexDirection="column" height="calc(100% - 57px)">
                {renderByvalue()}
            </FlexBox>
        </FlexBox>
    )
}