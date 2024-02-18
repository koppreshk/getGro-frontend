import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { useTheme } from "styled-components";

interface IConfigListViewProps {
    headers: string[];
    data: any;
}

export const ConfigListView = (props: IConfigListViewProps) => {
    const { headers } = props;
    const { pallete } = useTheme();

    return (
        <FlexBox flexDirection="column" width="100%">
            <GridLayout $padding="10px" $gridGap="10px" $gridTemplateColumns={"repeat(5, 1fr)"}>
                {headers.map((item) => <Typography color={pallete.grayVariant2} key={item} variant="h6">{item}</Typography>)}
            </GridLayout>
        </FlexBox>
    )
}