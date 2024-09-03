import { CircularProgress } from "@mui/material"
import { FlexBox, IFlexBoxProps } from "../flexbox/flexbox"

export const CenteredCircularProgress = (props: IFlexBoxProps) => {
    const { height = '100%', width = '100%', ...rest } = props;
    return (
        <FlexBox {...rest} alignItems="center" justifyContent="center" height={height} width={width} >
            <CircularProgress />
        </FlexBox>
    )
}