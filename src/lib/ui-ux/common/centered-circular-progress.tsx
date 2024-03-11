import { CircularProgress } from "@mui/material"
import { FlexBox } from "../flexbox/flexbox"

export const CenteredCircularProgress = (props: { height?: string, width?: string }) => {
    const { height = '100%', width = '100%' } = props;
    return (
        <FlexBox alignItems="center" justifyContent="center" height={height} width={width}>
            <CircularProgress />
        </FlexBox>
    )
}