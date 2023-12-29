import { useState, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { TagInputField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

const StyledTypography = styled(Typography)`
    &&{
        &:hover{
            text-decoration: underline;
        }
    }
`;

export const EmailHeaderOptions = () => {
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