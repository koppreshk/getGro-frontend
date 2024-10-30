import { Tooltip, Avatar } from "@mui/material";
import { chooseRandomColors } from "lib/utils";
import { FlexBox } from "..";

interface IUsers {
    firstName: string;
    lastName: string | null;
    id: number;
}

interface IAvatarGroup {
    users: IUsers[];
}

export const AvatarGroup = (props: IAvatarGroup) => {
    const { users } = props;

    return (
        <FlexBox gap="4px">
            {users.slice(0, 4).map((item, idx) => <UserAvatar key={item.id} item={item} idx={idx} />)}
            {users.length > 4
                ?
                <Tooltip arrow placement="bottom" title={users.slice(4).map(rest => rest.firstName ?? '').join(', ')}>
                    <Avatar
                        sx={{
                            width: 32, height: 32, fontSize: '13px',
                            fontWeight: 500, marginLeft: '-10px', border: '2px solid white'
                        }}>{('+' + users.slice(4).length)}
                    </Avatar>
                </Tooltip>
                : null}
        </FlexBox>
    )
}

const UserAvatar = (props: { item: IUsers, idx: number }) => {
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