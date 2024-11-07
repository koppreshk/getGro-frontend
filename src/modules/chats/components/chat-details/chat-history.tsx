import { useMemo } from "react";
import { Avatar, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import styled, { useTheme } from "styled-components";

const TimeLine = styled.div`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
  margin: 3px 0;
`;

const FlexContainer = styled(FlexBox)`
    overflow-y: auto;
    height: calc(100% - 70px);
    padding: 20px 10px;
`;

const exampleData = [
    {
        "name": "Sanjay G",
        "last_activity_date": "1day ago",
        "last_activity_desc": "Conversation transcript downloaded by self."
    },
    {
        "name": "Kop P",
        "last_activity_date": "1day ago",
        "last_activity_desc": "Conversation transcript downloaded by self. downloaded by"
    },
    {
        "name": "Sid M",
        "last_activity_date": "1day ago",
        "last_activity_desc": "Conversation transcript downloaded by self."
    }
]

export const ChatHistory = () => {
    const { pallete } = useTheme();

    return (
        <FlexContainer flexDirection="column">
            {exampleData.map((item, index) => (
                <FlexBox flexDirection="row" >
                    <FlexBox flexDirection="column" alignItems="center">
                        <UserAvatar userName={item.name} />
                        {index < exampleData.length - 1 && <TimeLine />}
                    </FlexBox>

                    <FlexBox flexDirection="column" gap="6px" padding="0 10px 15px" width="90%">
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="caption" sx={{ color: pallete.grayNeutral }}>made changes - {item.last_activity_date}</Typography>
                        </FlexBox>
                        <Typography variant="caption">
                            {item.last_activity_desc}
                        </Typography>
                    </FlexBox>
                </FlexBox>
            ))}

        </FlexContainer>
    )
}

const UserAvatar = (props: { userName: string }) => {
    const { userName } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(userName)), [userName]);

    return (
        <Avatar sx={{
            color: textColor,
            bgcolor: backgroundColor,
            width: '34px',
            height: '34px',
            fontSize: '13px',
            fontWeight: 500
        }}>{getInitialsByName(userName)}</Avatar>
    )
}
