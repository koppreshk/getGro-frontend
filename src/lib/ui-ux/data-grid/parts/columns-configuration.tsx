import { ViewWeekOutlined } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Popover, Button } from '@mui/material';
import { Column, VisibilityInstance } from '@tanstack/table-core';
import { FlexBox } from 'lib/ui-ux';
import { convertCamelCaseStringToSpaceSeparated } from 'lib/utils';
import { useState } from 'react';
import styled from 'styled-components';

import { CustomIconButton } from '../../common/custom-icon-button';

interface IColumnsConfigurationProps<T extends object>
  extends Pick<VisibilityInstance<T>, 'resetColumnVisibility'> {
  allColumns: Column<T, unknown>[];
  top: string;
}

const StyledIconButton = styled(CustomIconButton).attrs({
  className: 'column-configuration-btn',
})<{ $top: string }>`
  && {
    position: absolute;
    right: 0;
    top: ${({ $top }) => $top};
    z-index: 10;
    border-radius: unset;
    background: ${(props) => props.theme.pallete.white};
  }
`;
export const ColumnsConfiguration = <T extends object>(
  props: IColumnsConfigurationProps<T>
) => {
  const { allColumns, top, resetColumnVisibility } = props;
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
      <StyledIconButton
        onClick={handleClick}
        tooltipProps={{ title: 'Show/Hide Columns' }}
        $top={top}
        iconComponent={<ViewWeekOutlined />}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FlexBox padding="16px" flexDirection="column">
          {allColumns.map((column) => {
            return (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    {...{
                      checked: column.getIsVisible(),
                      disabled: !column.getCanHide(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />
                }
                label={
                  column.columnDef.id
                    ? convertCamelCaseStringToSpaceSeparated(
                        column.columnDef.id ?? ''
                      )
                    : ''
                }
              />
            );
          })}
          <Button variant="text" onClick={() => resetColumnVisibility()}>
            Reset Columns
          </Button>
        </FlexBox>
      </Popover>
    </>
  );
};
