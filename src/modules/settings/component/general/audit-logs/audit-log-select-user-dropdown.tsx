import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { IUsers, useFetchAllUsers } from "modules/settings/apis/users-and-permissions";
import React from "react";

interface IAuditLogSelectUserProps {
    user: string,
    selectUserHandleChange: (event: SelectChangeEvent) => void
}

export const AuditLogSelectUser = React.memo((props: IAuditLogSelectUserProps) => {
    const { data, isLoading } = useFetchAllUsers("all");

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <AuditLogSelectUserComponent data={data} {...props} />
    }

    return null;
})

interface IAuditLogSelectUserComponentProps extends IAuditLogSelectUserProps {
    data: IUsers[]
}

const AuditLogSelectUserComponent = React.memo((props: IAuditLogSelectUserComponentProps) => {
    const { data, selectUserHandleChange, user } = props;
    console.log('AuditLogSelectUserComponent');
    
    return (
        <FormControl sx={{ width: '25%' }} size="small">
            <InputLabel id="demo-select-small-label">Users</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                value={user}
                label="Age"
                onChange={selectUserHandleChange}
            >
                <MenuItem value="">
                    <Typography variant="caption">None</Typography>
                </MenuItem>
                {
                    data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            <FlexBox flexDirection="column">
                                <Typography variant="caption">
                                    {item.name} - email.com
                                </Typography>
                            </FlexBox>
                        </MenuItem>))
                }
            </Select>
        </FormControl>
    )
});
