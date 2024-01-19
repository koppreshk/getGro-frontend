import { Skeleton } from "@mui/material"
import { FlexBox } from "../flexbox/flexbox"

export const ChatConversationLoader = () => {
    return (
        <>
            {Array(10).fill({}).map((_item, index) => (
                <FlexBox gap={'10px'} alignItems="center" width="100%" key={index} flexDirection={index % 2 == 0 ? 'row' : 'row-reverse'}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton width={310} height={40} />
                </FlexBox>
            ))}
        </>
    )
}