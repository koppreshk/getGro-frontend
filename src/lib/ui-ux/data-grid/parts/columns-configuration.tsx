import { Checkbox, FormControlLabel, IconButton, Popover, Tooltip, Button } from "@mui/material";
import { ViewWeekOutlined } from '@mui/icons-material';
import { useState } from "react";
import { Column, VisibilityInstance } from "@tanstack/table-core";
import { FlexBox } from "lib/ui-ux";
import { convertCamelCaseStringToSpaceSeparated } from "lib/utils";
import styled from "styled-components";

interface IColumnsConfigurationProps<T extends object> extends Pick<VisibilityInstance<T>, 'resetColumnVisibility'> {
    allColumns: Column<T, unknown>[];
}

const StyledIconButton = styled(IconButton)`
    &&{
        position: absolute;
        right: 0;
        top: 85px;
        background: ${(props) => props.theme.pallete.white};
    }
`
export const ColumnsConfiguration = <T extends object>(props: IColumnsConfigurationProps<T>) => {
    const { allColumns, resetColumnVisibility } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Show/Hide Columns">
                <StyledIconButton onClick={handleClick}>
                    <ViewWeekOutlined />
                </StyledIconButton>
            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}>
                <FlexBox $padding="16px" $flexDirection="column">
                    {
                        allColumns.map(column => {
                            return (
                                <FormControlLabel
                                    key={column.id}
                                    control={<Checkbox
                                        {...{
                                            checked: column.getIsVisible(),
                                            disabled: !column.getCanHide(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />}
                                    label={convertCamelCaseStringToSpaceSeparated(column.columnDef.id ?? '')} />
                            )
                        })
                    }
                    <Button variant="text" onClick={() => resetColumnVisibility()}>Reset Columns</Button>
                </FlexBox>
            </Popover>
        </>
    )
}