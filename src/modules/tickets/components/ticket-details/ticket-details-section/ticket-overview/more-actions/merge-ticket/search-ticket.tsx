import React from "react";
import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TicketInfo } from "./ticket-info";
import { IPrimaryTicketDetailsProps } from "./primary-ticket-details";

export const SearchTickets = (props: Pick<IPrimaryTicketDetailsProps, 'data' | 'isLoading' | 'onChange'>) => {
    const { data, isLoading, onChange } = props;
    return (
        <FlexBox flexDirection="column" gap={'5px'}>
            <Autocomplete
                id="grouped-demo"
                options={data?.data || []}
                multiple
                sx={{ width: '100%' }}
                filterOptions={(x) => x}
                disableCloseOnSelect
                getOptionLabel={(option) => option.description}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        placeholder="Search a secondary ticket by ID or Subject"
                        size="small"
                        autoFocus
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        onChange={onChange} />
                )}
                renderOption={(props, option, { selected }) => {
                    return (
                        <li {...props} key={option.ticketId}>
                            <TicketInfo
                                multiSelect
                                checked={selected}
                                ticketDetails={{
                                    customerName: option.customerName,
                                    description: option.description,
                                    ticketStatus: option.ticketStatus,
                                    ticketId: option.ticketId
                                }}
                            />
                        </li>
                    )
                }}
            />
            <Typography variant="body3">Search and add secondary tickets that you want to merge with primary tickets</Typography>
        </FlexBox>
    )
}