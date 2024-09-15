import { Typography } from "@mui/material";
import { CheckboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { AllPermissionKeys } from "./types";

export const PermissionList = (props: {
    name: string;
    permissionKey: AllPermissionKeys;
}) => {
    const { name, permissionKey } = props;
    return (
        <FlexBox gap={'10px'} alignItems="center">
            <CheckboxField name={`permissions.${permissionKey as string}`} />
            <Typography variant="body2">{name}</Typography>
        </FlexBox>
    )
}