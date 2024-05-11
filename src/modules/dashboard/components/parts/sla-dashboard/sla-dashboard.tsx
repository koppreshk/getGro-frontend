import { FlexBox } from "lib/ui-ux"

interface ISLADashboardProps {
    data: string
}

export const SLADashboard = (props: ISLADashboardProps) => {
    const { data } = props;
    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="0px 25px">
                {data}
            </FlexBox>
        </>
    )
}