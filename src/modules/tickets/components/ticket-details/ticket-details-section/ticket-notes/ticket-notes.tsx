import { Edit, Save } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { chooseRandomColors, getInitialsByName } from 'lib/utils';
import { INotes, useEditNote } from 'modules/tickets/apis';
import { useAddNote } from 'modules/tickets/apis/ticket-notes/add-note';
import {
  DeleteAllNotesContainer,
  DeleteNoteContainer,
} from 'modules/tickets/containers/ticket-notes';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import styled, { useTheme } from 'styled-components';

import { CommonHeader } from '../common-header';

const EditorContainer = styled.div`
  width: 100%;

  .ql-container {
    height: 180px;
    max-height: 200px;
    overflow: auto;
  }
`;

const Note = (
  props: INotes & { onEdit: (id: number, note: string) => void }
) => {
  const { createdAt, note, userName, onEdit } = props;
  const { pallete } = useTheme();
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(userName)),
    [userName]
  );
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        width: '100%',
        height: 'fit-content',
        overflow: 'unset',
        background: pallete.genericBackgroundColor,
      }}
    >
      <CardContent>
        <FlexBox alignItems="center" justifyContent="space-between">
          <FlexBox gap={'5px'} alignItems="center">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '13px',
                fontWeight: 500,
                color: textColor,
                bgcolor: backgroundColor,
              }}
            >
              {getInitialsByName(userName)}
            </Avatar>
            <Typography variant="h6">{userName}</Typography>
          </FlexBox>
          <Typography variant="h6">{createdAt}</Typography>
        </FlexBox>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mt: 1 }}
          dangerouslySetInnerHTML={{ __html: note }}
        />
      </CardContent>
      <CardActions>
        <FlexBox justifyContent="flex-end" width="100%" gap={'5px'}>
          <CustomIconButton
            iconComponent={<Edit />}
            onClick={() => onEdit(props.id, note)}
            tooltipProps={{ title: t('edit_note'), arrow: true }}
          />
          <DeleteNoteContainer id={props.id} />
        </FlexBox>
      </CardActions>
    </Card>
  );
};

export const TicketNotes = (props: { notes: INotes[]; ticketId: number }) => {
  const { notes, ticketId } = props;
  const [value, setValue] = useState('');
  const [editId, setEditId] = useState<number | undefined>();
  const { mutateAsync: addNote } = useAddNote();
  const { mutateAsync: editNote } = useEditNote();
  const { t } = useTranslation();

  const onChange = (newvalue: string) => {
    setValue(newvalue);
  };

  const onSaveClick = () => {
    if (editId !== undefined) {
      editNote({ note: value, note_id: editId }).then(() => {
        setValue('');
        setEditId(undefined);
      });
      return;
    }
    addNote({ note: value, ticket_id: ticketId }).then(() => setValue(''));
  };

  const onEdit = (id: number, note: string) => {
    setEditId(id);
    setValue(note);
  };

  const renderDeleteAllNotes = () => {
    return <DeleteAllNotesContainer />;
  };

  return (
    <FlexBox flexDirection="column" height="100%">
      <CommonHeader
        headerName={t('ticket_notes')}
        renderFarPositionedItems={renderDeleteAllNotes}
      />
      <FlexBox
        height="calc(100% - 265px);"
        flexDirection="column"
        gap={'10px'}
        width="100%"
        padding="20px"
        overflowY="auto"
      >
        {notes.length ? (
          notes.map((note) => <Note {...note} key={note.id} onEdit={onEdit} />)
        ) : (
          <FlexBox
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="inherit"
          >
            <Typography>
              <Trans i18nKey="no_notes_found" />
            </Typography>
          </FlexBox>
        )}
      </FlexBox>

      <FlexBox
        gap="10px"
        width="100%"
        alignItems="center"
        style={{ position: 'relative' }}
      >
        <EditorContainer>
          <ReactQuill
            theme="snow"
            value={value}
            placeholder={t('type_in_here')}
            preserveWhitespace
            onChange={onChange}
          />
        </EditorContainer>
        <IconButton
          aria-label="First"
          onClick={onSaveClick}
          color="primary"
          sx={{ position: 'absolute', top: '1px', right: '0px' }}
        >
          <Save />
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
};
