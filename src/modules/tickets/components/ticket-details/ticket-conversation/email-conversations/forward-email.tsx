import ReactQuill from "react-quill";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Delete, Send } from "@mui/icons-material";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { FlexBox } from "lib/ui-ux";
import { TagInputField } from "lib/form-fields";

interface IForwardEmailProps {
    from: string;
    forwardEditorValue: string;
    onCancelClick: () => void
    onForwardEditorValueChange: (value: string) => void;
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .ql-toolbar, .ql-container {
        border-left: 0;
        border-right: 0;
    }
    .ql-container {
        min-height: 180px;
        border-bottom: 0px;
    }
    .ql-editor {
        padding: 12px 16px;
    }
`;

const StyledTypography = styled(Typography)`
    &&{
        &:hover{
            text-decoration: underline;
        }
    }
`;

const StyledForwardCardContainer = styled(FlexBox)`
    border: 1px solid #ccc;
    border-radius: 16px;
    &:hover, &:focus-within {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
`;

export const RoundedSendButton = styled(Button)`
    &&{
        border-radius: 25px;
        padding: 6px 25px;

        .MuiButton-endIcon {
            margin-left: 12px;
        }
    }
`;

export const ForwardEmail = (props: IForwardEmailProps) => {
    const { forwardEditorValue, from, onForwardEditorValueChange, onCancelClick } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(from)), [from]);

    return (
        <FlexBox $gap="10px" >
            <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>{getInitialsByName(from)}</Avatar>
            <StyledForwardCardContainer $flexDirection="column" $gap="10px" $width="calc(100% - 60px)">
                <ForwardEmailOptions />
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={forwardEditorValue}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onForwardEditorValueChange} />
                </EditorContainer>
                <FlexBox $justifyContent="space-between" $padding="0px 16px 10px">
                    <RoundedSendButton variant="contained" endIcon={<Send />}>
                        Send
                    </RoundedSendButton>
                    <IconButton onClick={onCancelClick}>
                        <Delete />
                    </IconButton>
                </FlexBox>
            </StyledForwardCardContainer>
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
        <FlexBox $width="100%" $flexDirection="column" $gap="10px" $padding="12px 16px">
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