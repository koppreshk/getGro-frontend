/* eslint-disable @typescript-eslint/naming-convention */
import { ExpandMore } from '@mui/icons-material';
import { Avatar, Chip, MenuItem, Typography } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled as MUIStyled, alpha } from '@mui/material/styles';
import { Property } from 'csstype';
import { KeyCodes } from 'lib/enums';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { styled } from 'styled-components';

import { FlexBox } from '../flexbox/flexbox';
import { TypographyName } from '../styled-components';

export interface ITagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * suppyling this will render tags in controlled mode
   */
  tagInputs?: string[];
  width?: string;
  gap?: Property.Gap;
  className?: string;
  allowToAddTagsViaText?: boolean;
  allowSuggestions?: boolean;
  suggestedTags?: string[];
  dontShowDashes?: boolean;
  onTagClick?: (item: string) => void;
  onTagInputChange?: (
    items: string[],
    item: string,
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
  const [tagItems, setTagItems] = useState<string[]>([]);
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

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setInputValue(ev.target.value);
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (
      ev.key === KeyCodes.EnterKey &&
      ev.currentTarget.value.length > 0 &&
      !ev.currentTarget.validity.typeMismatch
    ) {
      setInputValue('');
      if (onTagInputChange) {
        onTagInputChange([...tagItems, value], value, 'ON_ENTER_KEY');
        return;
      }
      setTagItems([...tagItems, value]);
    }
  };

  const __onTagDeleteHandler = useCallback(
    (item: string) => {
      const filteredValues = tagItems.filter((option) => option !== item);
      setTagItems(filteredValues);
      if (onTagInputChange) onTagInputChange(filteredValues, item, 'ON_DELETE');
    },
    [onTagInputChange, tagItems]
  );

  const onMenuItemClick = (itemValue: string) => {
    setTagItems([...tagItems, itemValue]);
    if (onTagInputChange)
      onTagInputChange([...tagItems, itemValue], itemValue, 'ON_SUGGESTION');
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
            tagItems.map((item, index) => (
              <Chip
                key={index}
                label={item}
                size="small"
                onClick={() => onTagClick && onTagClick(item)}
                avatar={<Avatar>{item[0].toLocaleUpperCase()}</Avatar>}
                onDelete={() => __onTagDeleteHandler(item)}
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
              onChange={_onChange}
              onKeyDown={_onKeyDown}
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
            <MenuItem key={item} onClick={() => onMenuItemClick(item)}>
              {item}
            </MenuItem>
          ))}
      </StyledMenu>
    </>
  );
};

export const StyledTags = styled(TagInput)`
  padding: 8px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  border: ${({ theme }) => theme.semantics.standardBorder};
  width: 100%;
`;

interface IManageTagsProps {
  associatedTags: IGenericResponse[];
  allTags: IGenericResponse[];
  onTagsChange: (tags: number[]) => Promise<void>;
}

export const ManageTags = (props: IManageTagsProps) => {
  const { associatedTags, allTags, onTagsChange } = props;
  const mappedTags = associatedTags.map((item) => item.name);
  const [tagItems, setTagItems] = useState<string[]>(mappedTags);

  useEffect(() => {
    if (mappedTags.length !== tagItems.length) {
      setTagItems(mappedTags);
    }
  }, [mappedTags, tagItems]);

  const onTagInputChange = useCallback(
    (items: string[]) => {
      const tagsIds = allTags
        .filter((it) => items.includes(it.name))
        .map((i) => i.id);
      onTagsChange(tagsIds);
    },
    [allTags, onTagsChange]
  );

  return (
    <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'} width="100%">
      <TypographyName variant="h6">
        <Trans i18nKey={'tags'} />
      </TypographyName>
      <StyledTags
        tagInputs={tagItems}
        gap={'15px'}
        allowToAddTagsViaText={false}
        allowSuggestions
        suggestedTags={allTags.map((item) => item.name)}
        onTagInputChange={onTagInputChange}
      />
    </FlexBox>
  );
};
