import React from "react";
import { KeyCodes } from "lib/enums";
import { useCallback, useState } from "react";
import { Property } from 'csstype';
import styled from "styled-components";
import { FlexBox } from "../flexbox/flexbox";
import { Avatar, Chip, MenuItem } from "@mui/material";
import { styled as MUIStyled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { ExpandMore } from "@mui/icons-material";

export interface ITagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
    onTagClick?: (item: string) => void;
    onTagInputChange?: (items: string[], item: string, reason: 'ON_ENTER_KEY' | 'ON_DELETE' | 'ON_SUGGESTION') => void;
}

const StyledInput = styled.input`
    border: none;
    outline: none;
    padding: 0;
`;

const StyledMenu = MUIStyled((props: MenuProps) => (
    <Menu
        elevation={0}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export const TagInput = (props: ITagInputProps) => {
    const { onTagInputChange, onTagClick, tagInputs, width, gap, className, allowToAddTagsViaText = true, allowSuggestions, suggestedTags = [], ...rest } = props;
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
            setTagItems(tagInputs)
        }
    }, [tagInputs])

    const _onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        setInputValue(ev.target.value)
    };

    const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
        if (ev.key === KeyCodes.EnterKey && ev.currentTarget.value.length > 0 && !ev.currentTarget.validity.typeMismatch) {
            setInputValue('');
            if (onTagInputChange) {
                onTagInputChange([...tagItems, value], value, 'ON_ENTER_KEY');
                return;
            }
            setTagItems([...tagItems, value]);
        }
    };

    const __onTagDeleteHandler = useCallback((item: string) => {
        const filteredValues = tagItems.filter((option) => option !== item);
        setTagItems(filteredValues);
        onTagInputChange && onTagInputChange(filteredValues, item, 'ON_DELETE')
    }, [onTagInputChange, tagItems]);

    const onMenuItemClick = (value: string) => {
        setTagItems([...tagItems, value]);
        onTagInputChange && onTagInputChange([...tagItems, value], value, 'ON_SUGGESTION');
        handleClose();
    }

    return (
        <>
            <FlexBox className={className} justifyContent="space-between" width={width ?? "100%"} alignItems="center" onClick={allowSuggestions ? handleClick : undefined}>
                <FlexBox gap={gap ?? "10px"} flexWrap="wrap">
                    {tagItems.map((item, index) => (
                        <Chip
                            key={index}
                            label={item}
                            size="small"
                            onClick={() => onTagClick && onTagClick(item)}
                            avatar={<Avatar>{item[0].toLocaleUpperCase()}</Avatar>}
                            onDelete={() => __onTagDeleteHandler(item)} />)
                    )}
                    {allowToAddTagsViaText
                        ? <StyledInput
                            autoFocus
                            autoComplete="off"
                            value={value}
                            onChange={_onChange} onKeyDown={_onKeyDown}
                            {...rest}
                        /> : null}
                </FlexBox>
                {allowSuggestions ? <ExpandMore sx={{ width: 16, height: 16 }} /> : null}
            </FlexBox>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {suggestedTags.filter((it) => !tagItems.includes(it)).map(item => (
                    <MenuItem key={item} onClick={() => onMenuItemClick(item)}>
                        {item}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    )
}