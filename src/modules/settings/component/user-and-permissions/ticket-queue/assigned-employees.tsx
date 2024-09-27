import { Tooltip, Avatar } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { chooseRandomColors } from "lib/utils";
import { Queue, Employee } from "modules/settings/apis/queues";

export const AssignedEmployees = (props: Pick<Queue, 'assignedEmployees'>) => {
    const { assignedEmployees } = props;
    return (
        <FlexBox gap="4px">
            {assignedEmployees.slice(0, 4).map((item, idx) => <EmployeeAvatar key={item.id} item={item} idx={idx} />)}
            {assignedEmployees.length > 4
                ?
                <Tooltip arrow placement="bottom" title={assignedEmployees.slice(4).map(rest => rest.firstName).join(', ')}>
                    <Avatar
                        sx={{
                            width: 32, height: 32, fontSize: '13px',
                            fontWeight: 500, marginLeft: '-10px', border: '2px solid white'
                        }}>{('+' + assignedEmployees.slice(4).length)}
                    </Avatar>
                </Tooltip>
                : null}
        </FlexBox>
    )
}

const EmployeeAvatar = (props: { item: Employee, idx: number }) => {
    const { firstName, lastName } = props.item;
    const { backgroundColor, textColor } = chooseRandomColors(firstName + lastName)
    return (
        <Tooltip arrow placement="bottom" title={firstName + ' ' + (lastName ?? '')}>
            <Avatar
                sx={{
                    background: backgroundColor,
                    color: textColor,
                    marginLeft: props.idx > 0 ? '-10px' : 'unset',
                    width: 32, height: 32, fontSize: '13px', fontWeight: 500, border: '2px solid white'
                }}>{firstName[0] + (lastName ? lastName[0] : '')}</Avatar>
        </Tooltip>
    )
}