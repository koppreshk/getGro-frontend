import { Typography } from "@mui/material";
import { CheckboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

export const PermissionList = (props: {
    name: string;
    permissionKey: string;
}) => {
    const { name, permissionKey } = props;
    return (
        <FlexBox gap={'10px'} alignItems="center">
            <CheckboxField name={permissionKey} />
            <Typography variant="body2">{name}</Typography>
        </FlexBox>
    )
}