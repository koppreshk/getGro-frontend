import React from "react";
import { KeyCodes } from "lib/enums";
import { useCallback, useState } from "react";
import { Property } from 'csstype';
import styled from "styled-components";
import { FlexBox } from "../flexbox/flexbox";
import { Avatar, Chip } from "@mui/material";

export interface ITagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * suppyling this will render tags in controlled mode
     */
    tagInputs?: string[];
    width?: string;
    gap?: Property.Gap;
    onTagInputChange?: (items: string[], item: string, reason: 'ON_ENTER_KEY' | 'ON_DELETE') => void;
}

const StyledInput = styled.input`
    border: none;
    outline: none;
    padding: 0;
`;

export const TagInput = (props: ITagInputProps) => {
    const { onTagInputChange, tagInputs, width, gap, ...rest } = props;
    const [tagItems, setTagItems] = useState<string[]>([]);
    const [value, setInputValue] = useState('');

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

    return (
        <FlexBox gap={gap ?? "10px"} flexWrap="wrap" width={width ?? "100%"}>
            {tagItems.map((item, index) => (
                <Chip
                    key={index}
                    label={item}
                    size="small"
                    avatar={<Avatar>{item[0].toLocaleUpperCase()}</Avatar>}
                    onDelete={() => __onTagDeleteHandler(item)} />)
            )}
            <StyledInput
                autoFocus
                autoComplete="off"
                value={value}
                onChange={_onChange} onKeyDown={_onKeyDown}
                {...rest}
            />
        </FlexBox>
    )
}