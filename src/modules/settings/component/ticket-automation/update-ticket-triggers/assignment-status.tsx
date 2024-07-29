import { Switch } from "@mui/material"
import { useNotifications } from "lib";
import { FlexBox } from "lib/ui-ux"
import { useSetAssignmentStatus } from "modules/settings/apis/ticket-automation";
import { useState } from "react";

export const AssignmentStatus = (props: { status: boolean, id: number }) => {
    const { status, id } = props;
    const { mutateAsync } = useSetAssignmentStatus();
    const [currentStatus, setCurrentStatus] = useState(status);
    const { showNotification } = useNotifications()

    const onChange = () => {
        setCurrentStatus((prevValue) => !prevValue)
        mutateAsync({ id: id })
            .catch(() => {
                setCurrentStatus((prevValue) => !prevValue);
                showNotification({ message: `Failed to perform the action`, type: 'error' })
            });
    }

    return (
        <FlexBox flexDirection="row" gap="5px" alignItems="center">
            {<Switch checked={currentStatus} onChange={onChange} />}
        </FlexBox>
    )
}