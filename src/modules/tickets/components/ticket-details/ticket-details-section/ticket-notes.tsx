import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { Button, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";

const InnreHTML = styled.div`
    height: 75%;
`;

const EditorContainer = styled.div`
    width: calc(100% - 77px);
   
    .ql-container {
        max-height: 200px;
        overflow: auto;
    }
`;

export const TicketNotes = () => {
    const [value, setValue] = useState('');
    const [savedState, onSaveState] = useState('');

    const onChange = (value: string) => {
        setValue(value);
    }

    const onSaveClick = () => {
        onSaveState(value)
    }

    return (
        <FlexBox $flexDirection="column" $padding="10px" $height="100%">
            <Typography fontWeight="500">Ticket notes</Typography>
            <HorizontalSeparator $margin="10px 0px" />

            {savedState.length === 0 ?
                <FlexBox $alignItems="center" $height="75%" $justifyContent="center">No notes present</FlexBox>
                : null}

            <InnreHTML dangerouslySetInnerHTML={{ __html: savedState }} />

            <FlexBox $gap="10px" $width="100%" $alignItems="center">
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onChange} />
                </EditorContainer>
                <Button variant="contained" endIcon={<Save />} onClick={onSaveClick} size="small" sx={{ height: '40px' }}>
                    Save
                </Button>
            </FlexBox>
        </FlexBox>
    )
}   