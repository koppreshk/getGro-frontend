import React from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material"
import { useSearchParams } from "react-router-dom";
import { AuditLogSelectUser } from "./audit-log-select-user-dropdown";

const eventTypeMenuOptions = [
    {
        key: 'login',
        value: 'Login'
    },
    {
        key: 'deactivated',
        value: 'Deactivated'
    }, {
        key: 'deleted',
        value: 'Deleted'
    }, {
        key: 'created',
        value: 'Created'
    }
]

export const AuditLogFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [eventType, setEventType] = React.useState(searchParams.get('eventType') || '');
    const [user, setUser] = React.useState(searchParams.get('user') || '');

    const selectUserHandleChange = React.useCallback((event: SelectChangeEvent) => {
        const selectedUser = event.target.value 
        setUser(selectedUser);

        if (selectedUser) {
            searchParams.set('user', selectedUser);
            setSearchParams(searchParams);
            return;
        }
        searchParams.delete('user');
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams])

    const eventTypeHandleChange = React.useCallback((event: SelectChangeEvent) => {
        const eventTypeValue = event.target.value;
        setEventType(eventTypeValue);

        if (eventTypeValue) {
            searchParams.set('eventType', eventTypeValue);
            setSearchParams(searchParams);
            return;
        }
        searchParams.delete('eventType');
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    return (
        <Box display="flex" gap={4} width={'75%'} justifyContent={'flex-end'}>
            <FormControl sx={{ width: '25%' }} size="small">
                <InputLabel id="demo-select-small-label">Event Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small-label"
                    value={eventType}
                    label="Age"
                    onChange={eventTypeHandleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        eventTypeMenuOptions.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                                {item.value}
                            </MenuItem>))
                    }
                </Select>
            </FormControl>
            <AuditLogSelectUser selectUserHandleChange={selectUserHandleChange} user={user}/>
        </Box>
    )
}