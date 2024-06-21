import { Switch } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { useSetEscalationStatus } from "modules/settings/apis/escalations";

export const SLAStatus = (props: { status: boolean, id: number }) => {
    const { status, id } = props;
    const { mutateAsync } = useSetEscalationStatus();

    const onChange = () => {
        mutateAsync({ id: id });
    }

    return (
        <FlexBox flexDirection="row" gap="5px">
            <Switch defaultChecked={status} onChange={onChange} />
        </FlexBox>
    )
}