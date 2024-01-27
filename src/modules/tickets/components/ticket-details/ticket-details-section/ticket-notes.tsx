import { FlexBox } from "lib/ui-ux";
import { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { IconButton } from "@mui/material";
import { Save } from "@mui/icons-material";
import { CommonHeader } from "./common-header";

const InnreHTML = styled.div`
    height: calc(100% - 265px);
    overflow: auto;
    max-height: 580px;
`;

const EditorContainer = styled.div`
    width: 100%;
   
    .ql-container {
        height: 180px;
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
        <FlexBox flexDirection="column" height="100%">
            <CommonHeader headerName="Ticket notes" />
            {savedState.length === 0 ?
                <FlexBox alignItems="center" height="calc(100% - 265px);" justifyContent="center">No notes present</FlexBox>
                : null}

            <InnreHTML dangerouslySetInnerHTML={{ __html: savedState }} />

            <FlexBox gap="10px" width="100%" alignItems="center" style={{ position: 'relative' }}>
                <EditorContainer>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        placeholder="Type in here"
                        preserveWhitespace
                        onChange={onChange} />
                </EditorContainer>
                <IconButton aria-label="First" onClick={onSaveClick} color="primary" sx={{ position: 'absolute', top: '1px', right: '0px' }}>
                    <Save />
                </IconButton>
            </FlexBox>
        </FlexBox>
    )
}   