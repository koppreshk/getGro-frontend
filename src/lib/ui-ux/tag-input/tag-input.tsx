import React from "react";
import { KeyCodes } from "lib/enums";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { FlexBox } from "../flexbox/flexbox";
import { Avatar, Chip } from "@mui/material";

export interface ITagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * suppyling this will render tags in controlled mode
     */
    tagInputs?: string[];
    width?: string;
    onTagInputChange?: (items: string[]) => void;
}

const StyledInput = styled.input`
    border: none;
    outline: none;
    padding: 0;
`;

export const TagInput = (props: ITagInputProps) => {
    const { onTagInputChange, tagInputs, width, ...rest } = props;
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
            setTagItems([...tagItems, value]);
            setInputValue('');
            onTagInputChange && onTagInputChange([...tagItems, value])
        }
    };

    const __onTagDeleteHandler = useCallback((item: string) => {
        const filteredValues = tagItems.filter((option) => option !== item);
        setTagItems(filteredValues);
        onTagInputChange && onTagInputChange(filteredValues)
    }, [onTagInputChange, tagItems]);

    return (
        <FlexBox $gap="10px" $flexWrap="wrap" $width={width ?? "100%"}>
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