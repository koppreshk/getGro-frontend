import { useCallback, useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox } from "lib/ui-ux";
import { useFormContext } from "react-hook-form";
import { TagInputField } from "lib/form-fields";

interface IForwardEmailProps {
    from: string;
    forwardEditorValue: string;
    onForwardEditorValueChange: (value: string) => void;
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .quill:hover, :focus {
        /* border-radius: 16px; */
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    .ql-toolbar {
        /* border-radius: 16px 16px 0px 0px; */
    }
    .ql-container {
        /* border-radius: 0px 0px 16px 16px; */
        min-height: 180px;
    }
`;

const StyledTypography = styled(Typography)`
    &&{
        &:hover{
            text-decoration: underline;
        }
    }
`;

export const ForwardEmail = (props: IForwardEmailProps) => {
    const { forwardEditorValue, from, onForwardEditorValueChange } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);

    return (
        <FlexBox $gap="10px" $width="calc(100% - 50px)">
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
            <FlexBox $flexDirection="column" $gap="10px" $width="100%">
                <ForwardEmailOptions />
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={forwardEditorValue}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onForwardEditorValueChange} />
                </EditorContainer>
            </FlexBox>
        </FlexBox>
    )
}

const ForwardEmailOptions = () => {
    const { watch } = useFormContext();
    const [showCCTagInput, setCCTagInputDisplay] = useState(false);
    const [showBCCTagInput, setBCCTagInputDisplay] = useState(false);
    const { bcc, cc } = watch();

    const onCCTextClick = useCallback(() => {
        setCCTagInputDisplay((prevValue) => !prevValue);
    }, [])

    const onBCCTextClick = useCallback(() => {
        setBCCTagInputDisplay((prevValue) => !prevValue);
    }, [])

    useEffect(() => {
        if (cc?.length === 0) {
            onCCTextClick();
        }
    }, [cc?.length, onCCTextClick]);

    useEffect(() => {
        if (bcc?.length === 0) {
            onBCCTextClick();
        }
    }, [bcc?.length, onBCCTextClick]);

    const renderTagInputs = (args: { name: string, label: string }) => {
        return (
            <FlexBox $gap="10px" $width="calc(100% - 63px)">
                <Typography variant="h6">{args.label}:</Typography>
                <TagInputField
                    name={args.name}
                    width="calc(100% - 30px)"
                    type="email"
                    required
                    pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                />
            </FlexBox>
        )
    }

    return (
        <FlexBox $width="100%" $flexDirection="column" $gap="10px">
            <FlexBox $width="100%">
                {renderTagInputs({ name: 'to', label: 'To' })}
                <FlexBox $gap="10px">
                    {!showCCTagInput && <StyledTypography variant="h6" onClick={onCCTextClick}>Cc</StyledTypography>}
                    {!showBCCTagInput && <StyledTypography variant="h6" onClick={onBCCTextClick}>Bcc</StyledTypography>}
                </FlexBox>
            </FlexBox>
            {showCCTagInput && renderTagInputs({ label: 'Cc', name: 'cc' })}
            {showBCCTagInput && renderTagInputs({ label: 'Bcc', name: 'bcc' })}
        </FlexBox>
    )
}