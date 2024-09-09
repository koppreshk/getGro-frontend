import React from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material"
import { useSearchParams } from "react-router-dom";

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
    const [eventType, setEventType] = React.useState('');

    const eventTypeHandleChange = (event: SelectChangeEvent) => {
        setEventType(event.target.value as string);

        if (event.target.value.length) {
            searchParams.set('eventType', event.target.value);
            setSearchParams(searchParams);
            return;
        }
        searchParams.delete('searchText');
        setSearchParams(searchParams);
    };

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
                    {
                        eventTypeMenuOptions.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                                {item.value}
                            </MenuItem>))
                    }
                </Select>
            </FormControl>
            <FormControl sx={{ width: '25%' }} size="small">
                <InputLabel id="demo-select-small-label">Users</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small-label"
                    value={eventType}
                    label="Age"
                    onChange={eventTypeHandleChange}
                >
                    {
                        eventTypeMenuOptions.map((item) => (
                            <MenuItem key={item.key} value={item.key}>
                                {item.value}
                            </MenuItem>))
                    }
                </Select>
            </FormControl>
           
        </Box>
    )
}