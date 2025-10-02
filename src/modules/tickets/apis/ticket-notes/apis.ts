export const TicketNotesEndPoint = {
  FETCH_ALL_NOTES: 'fetch_notes',
  DELETE_NOTE: 'delete_note',
  ADD_NOTE: 'add_note',
  EDIT_NOTE: 'update_note',
  DELETE_ALL_NOTES: 'delete_all_notes',
} as const;

export const TicketNotesQueryKey = {
  FETCH_ALL_NOTES: 'FETCH_ALL_NOTES',
  DELETE_NOTE: 'DELETE_NOTE',
  ADD_NOTE: 'ADD_NOTE',
  EDIT_NOTE: 'EDIT_NOTE',
  DELETE_ALL_NOTES: 'DELETE_ALL_NOTES',
} as const;
