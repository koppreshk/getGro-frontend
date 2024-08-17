import React from "react";
import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TicketInfo } from "./ticket-info";
import { IPrimaryTicketDetailsProps } from "./primary-ticket-details";
import { Controller, useFormContext } from "react-hook-form";

export const SearchTickets = (props: Pick<IPrimaryTicketDetailsProps, 'data' | 'isLoading' | 'onChange'>) => {
    const { data, isLoading, onChange } = props;
    const { control } = useFormContext();

    return (
        <FlexBox flexDirection="column" gap={'5px'}>
            <Controller
                render={({ field: { onChange: formOnChange, ...rest } }) => (
                    <Autocomplete
                        {...rest}
                        id="grouped-demo"
                        isOptionEqualToValue={(option, value) => option.ticketId === value.ticketId}
                        options={data?.data || []}
                        multiple
                        sx={{ width: '100%' }}
                        filterOptions={(x) => x}
                        disableCloseOnSelect
                        onChange={(_ev, newValue) => formOnChange(newValue)}
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
                )}
                control={control}
                name={'searchTickets'} />
            <Typography variant="body3">Search and add secondary tickets that you want to merge with primary tickets</Typography>
        </FlexBox>
    )
}