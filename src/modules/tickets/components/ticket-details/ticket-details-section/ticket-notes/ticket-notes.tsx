import { FlexBox } from "lib/ui-ux";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import ReactQuill from "react-quill";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import { CommonHeader } from "../common-header";
import { INotes } from "modules/tickets/apis";

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

export const TicketNotes = (props: { notes: INotes[] }) => {
    const { notes } = props;
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
            <FlexBox height="calc(100% - 265px);" padding="20px">
                {notes.map((note) => (
                    <Note {...note} key={note.id} />
                ))}
            </FlexBox>

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

const Note = (props: INotes) => {
    const { createdAt, note, userName } = props;
    const { pallete } = useTheme();
    return (
        <Card sx={{ width: '100%', height: 'fit-content', background: pallete.grayVariant5 }}>
            <CardContent>
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6">{userName}</Typography>
                    <Typography variant="h6">{createdAt}</Typography>
                </FlexBox>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    {note}
                </Typography>
            </CardContent>
        </Card>
    )
}