import { ExpandMore } from '@mui/icons-material';
import { Avatar, Chip, MenuItem, Typography } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled as MUIStyled, alpha } from '@mui/material/styles';
import { Property } from 'csstype';
import { KeyCodes } from 'lib/enums';
import { generateId } from 'lib/utils';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { FlexBox } from '../flexbox/flexbox';

export interface ITagInput {
  id: number | string;
  name: string;
}
export interface ITagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * suppyling this will render tags in controlled mode
   */
  tagInputs?: ITagInput[];
  width?: string;
  gap?: Property.Gap;
  className?: string;
  allowToAddTagsViaText?: boolean;
  allowSuggestions?: boolean;
  suggestedTags?: ITagInput[];
  dontShowDashes?: boolean;
  onTagClick?: (item: ITagInput) => void;
  onTagInputChange?: (
    items: ITagInput[],
    item: ITagInput,
    reason: 'ON_ENTER_KEY' | 'ON_DELETE' | 'ON_SUGGESTION'
  ) => void;
}

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
`;

const StyledMenu = MUIStyled((props: MenuProps) => (
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const TagInput = (props: ITagInputProps) => {
  const {
    onTagInputChange,
    onTagClick,
    tagInputs,
    width,
    gap,
    className,
    allowToAddTagsViaText = true,
    allowSuggestions,
    suggestedTags = [],
    dontShowDashes = false,
    ...rest
  } = props;
  const [tagItems, setTagItems] = useState<ITagInput[]>([]);
  const [value, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (tagInputs) {
      setTagItems(tagInputs);
    }
  }, [tagInputs]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setInputValue(ev.target.value);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (
      ev.key === KeyCodes.EnterKey &&
      ev.currentTarget.value.length > 0 &&
      !ev.currentTarget.validity.typeMismatch
    ) {
      const newTag = { id: generateId(), name: value };
      setInputValue('');
      if (onTagInputChange) {
        onTagInputChange([...tagItems, newTag], newTag, 'ON_ENTER_KEY');
        return;
      }
      setTagItems([...tagItems, newTag]);
    }
  };

  const onTagDeleteHandler = useCallback(
    (item: ITagInput) => {
      const filteredValues = tagItems.filter((option) => option.id !== item.id);
      setTagItems(filteredValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onTagInputChange && onTagInputChange(filteredValues, item, 'ON_DELETE');
    },
    [onTagInputChange, tagItems]
  );

  const onMenuItemClick = (newTag: ITagInput) => {
    setTagItems([...tagItems, newTag]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onTagInputChange &&
      onTagInputChange([...tagItems, newTag], newTag, 'ON_SUGGESTION');
    handleClose();
  };

  return (
    <>
      <FlexBox
        className={className}
        justifyContent="space-between"
        width={width ?? '100%'}
        alignItems="center"
        onClick={allowSuggestions ? handleClick : undefined}
        style={{ cursor: allowSuggestions ? 'pointer' : 'unset' }}
      >
        <FlexBox
          gap={gap ?? '10px'}
          flexWrap="wrap"
          width={allowSuggestions ? 'calc(100% - 16px)' : 'inherit'}
        >
          {tagItems.length ? (
            tagItems.map((item) => (
              <Chip
                key={item.id}
                label={item.name}
                size="small"
                onClick={() => onTagClick && onTagClick(item)}
                avatar={<Avatar>{item.name[0].toLocaleUpperCase()}</Avatar>}
                onDelete={() => onTagDeleteHandler(item)}
              />
            ))
          ) : dontShowDashes ? null : (
            <Typography variant="h6">--</Typography>
          )}
          {allowToAddTagsViaText ? (
            <StyledInput
              autoFocus
              autoComplete="off"
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              {...rest}
            />
          ) : null}
        </FlexBox>
        {allowSuggestions ? (
          <ExpandMore sx={{ width: 16, height: 16 }} />
        ) : null}
      </FlexBox>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {suggestedTags
          .filter((it) => !tagItems.includes(it))
          .map((item) => (
            <MenuItem key={item.id} onClick={() => onMenuItemClick(item)}>
              {item.name}
            </MenuItem>
          ))}
      </StyledMenu>
    </>
  );
};
